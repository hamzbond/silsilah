/* ===========================
   DATA.JS - CSV Fetch & Parse
   Handles Google Sheets CSV fetching and data validation
   =========================== */

class DataManager {
    constructor() {
        this.csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTqvqt94sMxO76yufk2ooxHBRQUxTa6jNOQZFxdicv2Hx_qFiSHz87u5FBlA3NFF6ORNB3E7bUxC2kn/pub?gid=749521156&single=true&output=csv';
        this.data = [];
        this.dataMap = {}; // For quick lookup by ID
    }

    /**
     * Fetch CSV from Google Sheets
     */
    async fetchCSV() {
        try {
            console.log('Fetching CSV from:', this.csvUrl);
            const response = await fetch(this.csvUrl);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const csvText = await response.text();
            console.log('CSV fetched successfully, parsing...');
            return csvText;
        } catch (error) {
            console.error('Error fetching CSV:', error);
            throw new Error(`Failed to fetch data: ${error.message}`);
        }
    }

    /**
     * Parse CSV text using PapaParse
     */
    parseCSV(csvText) {
        try {
            const result = Papa.parse(csvText, {
                header: true,           // Use first row as header
                dynamicTyping: false,   // Keep as strings for now
                skipEmptyLines: true,   // Skip empty rows
                transformHeader: (h) => h.trim() // Trim header spaces
            });

            if (result.errors && result.errors.length > 0) {
                console.warn('PapaParse warnings:', result.errors);
            }

            console.log('CSV parsed. Row count:', result.data.length);
            return result.data;
        } catch (error) {
            console.error('Error parsing CSV:', error);
            throw new Error(`Failed to parse CSV: ${error.message}`);
        }
    }

    /**
     * Validate and enrich data (NEW FORMAT)
     */
    validateData(rawData) {
        console.log('Validating data...');
        const validated = [];
        const requiredFields = ['id', 'nama'];
        const errors = [];

        for (let i = 0; i < rawData.length; i++) {
            const row = rawData[i];
            
            // Skip completely empty rows
            if (!row.id || !row.nama) continue;

            // Validate required fields
            for (const field of requiredFields) {
                if (!row[field] || String(row[field]).trim() === '') {
                    errors.push(`Row ${i + 2}: Missing ${field}`);
                    continue;
                }
            }

            // Normalize gender: L/P → male/female for internal use
            let gender = 'male'; // default
            if (row.jenis_kelamin) {
                const genderVal = String(row.jenis_kelamin).trim().toUpperCase();
                if (genderVal === 'P' || genderVal === 'PEREMPUAN') {
                    gender = 'female';
                }
            }

            // Parse birth date - support both YYYY-MM-DD and DD Bulan YYYY
            const bdate = this._parseDateFlexible(row.tgl_lahir);

            // Parse pasangan - single ID (not array)
            const pasanganId = String(row.id_pasangan || '').trim();
            const pids = pasanganId ? [pasanganId] : [];

            const person = {
                id: String(row.id).trim(),
                name: String(row.nama).trim(),
                gender: gender,
                pids: pids,
                fid: String(row.id_ayah || '').trim() || null,
                mid: String(row.id_ibu || '').trim() || null,
                bdate: bdate,
                photo: this._validateUrl(row.foto),
                panggilan: String(row.panggilan || '').trim() || null,
                lokasi: String(row.lokasi || '').trim() || null,
                // New fields
                tgl_kematian: this._parseDateFlexible(row.tgl_kematian),
                telp: String(row.telp || '').trim() || null,
                email: String(row.email || '').trim() || null,
                catatan: String(row.catatan || '').trim() || null
            };

            validated.push(person);
        }

        if (errors.length > 0) {
            console.warn('Data validation warnings:', errors);
        }

        console.log(`Validated ${validated.length} records`);
        return validated;
    }

    /**
     * Parse date in flexible format (YYYY-MM-DD or DD Bulan YYYY)
     */
    _parseDateFlexible(dateString) {
        if (!dateString || String(dateString).trim() === '') return null;
        
        const dateStr = String(dateString).trim();
        
        // Try YYYY-MM-DD format first
        const isoRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (isoRegex.test(dateStr)) {
            const date = new Date(dateStr + 'T00:00:00Z');
            if (!isNaN(date.getTime())) {
                return dateStr;
            }
        }
        
        // Try DD Bulan YYYY format (e.g., "24 Juli 1996")
        const months = {
            'januari': '01', 'februari': '02', 'maret': '03', 'april': '04',
            'mei': '05', 'juni': '06', 'juli': '07', 'agustus': '08',
            'september': '09', 'oktober': '10', 'november': '11', 'desember': '12',
            'jan': '01', 'feb': '02', 'mar': '03', 'apr': '04',
            'may': '05', 'jun': '06', 'jul': '07', 'aug': '08',
            'sep': '09', 'oct': '10', 'nov': '11', 'dec': '12'
        };
        
        const indonesianRegex = /^(\d{1,2})\s+(\w+)\s+(\d{4})$/;
        const match = dateStr.match(indonesianRegex);
        
        if (match) {
            const day = match[1].padStart(2, '0');
            const monthName = match[2].toLowerCase();
            const year = match[3];
            const month = months[monthName];
            
            if (month && year) {
                const isoDate = `${year}-${month}-${day}`;
                const date = new Date(isoDate + 'T00:00:00Z');
                if (!isNaN(date.getTime())) {
                    return isoDate;
                }
            }
        }
        
        console.warn(`Could not parse date: "${dateStr}"`);
        return null;
    }

    /**
     * Parse comma-separated IDs
     */
    _parseIds(idString) {
        if (!idString || String(idString).trim() === '') return [];
        return String(idString)
            .split(',')
            .map(id => id.trim())
            .filter(id => id !== '');
    }

    /**
     * Validate and format date (YYYY-MM-DD) - Deprecated, use _parseDateFlexible instead
     */
    _validateDate(dateString) {
        return this._parseDateFlexible(dateString);
    }

    /**
     * Validate URL
     */
    _validateUrl(urlString) {
        if (!urlString || String(urlString).trim() === '') return null;
        
        const urlStr = String(urlString).trim();
        try {
            new URL(urlStr);
            return urlStr;
        } catch {
            console.warn(`Invalid URL: "${urlStr}"`);
            return null;
        }
    }

    /**
     * Build data map for quick lookup
     */
    buildDataMap(data) {
        this.dataMap = {};
        for (const person of data) {
            this.dataMap[person.id] = person;
        }
        console.log('Data map built:', Object.keys(this.dataMap).length, 'records');
    }

    /**
     * Load and process all data
     */
    async loadData() {
        try {
            const csvText = await this.fetchCSV();
            const rawData = this.parseCSV(csvText);
            
            // If no data, use dummy data for testing
            if (rawData.length === 0) {
                console.warn('No data in CSV, using dummy data for testing...');
                return this.getDummyData();
            }
            
            const validatedData = this.validateData(rawData);
            this.buildDataMap(validatedData);
            this.data = validatedData;
            return validatedData;
        } catch (error) {
            console.error('Error loading data, using dummy data for testing:', error);
            return this.getDummyData();
        }
    }

    /**
     * Get dummy data for testing (NEW FORMAT)
     */
    getDummyData() {
        const dummyData = [
            { id: '1', nama: 'Kakek Mardjo', tgl_lahir: '14 Februari 1935', Umur: '91', jenis_kelamin: 'L', id_pasangan: '2', id_ayah: '', id_ibu: '', foto: '', tgl_kematian: '', telp: '', email: '', panggilan: 'Kakek', lokasi: 'Yogyakarta', catatan: '' },
            { id: '2', nama: 'Nenek Samsiyah', tgl_lahir: '22 September 1937', Umur: '88', jenis_kelamin: 'P', id_pasangan: '1', id_ayah: '', id_ibu: '', foto: '', tgl_kematian: '', telp: '', email: '', panggilan: 'Nenek', lokasi: 'Yogyakarta', catatan: '' },
            { id: '3', nama: 'Ayah Haryanto', tgl_lahir: '10 Januari 1960', Umur: '66', jenis_kelamin: 'L', id_pasangan: '4', id_ayah: '1', id_ibu: '2', foto: '', tgl_kematian: '', telp: '0812345678', email: '', panggilan: 'Pak Hary', lokasi: 'Jakarta', catatan: '' },
            { id: '4', nama: 'Ibu Sriwijaya', tgl_lahir: '20 Mei 1962', Umur: '64', jenis_kelamin: 'P', id_pasangan: '3', id_ayah: '1', id_ibu: '2', foto: '', tgl_kematian: '', telp: '0898765432', email: '', panggilan: 'Ibu Sri', lokasi: 'Jakarta', catatan: '' },
            { id: '5', nama: 'Budi Santoso', tgl_lahir: '25 Juni 1985', Umur: '40', jenis_kelamin: 'L', id_pasangan: '6', id_ayah: '3', id_ibu: '4', foto: '', tgl_kematian: '', telp: '08111111111', email: 'budi@gmail.com', panggilan: 'Budi', lokasi: 'Jakarta', catatan: '' },
            { id: '6', nama: 'Siti Nurhaliza', tgl_lahir: '30 November 1987', Umur: '38', jenis_kelamin: 'P', id_pasangan: '5', id_ayah: '3', id_ibu: '4', foto: '', tgl_kematian: '', telp: '08222222222', email: 'siti@gmail.com', panggilan: 'Siti', lokasi: 'Jakarta', catatan: '' },
            { id: '7', nama: 'Rina Santoso', tgl_lahir: '18 April 1990', Umur: '36', jenis_kelamin: 'P', id_pasangan: '', id_ayah: '3', id_ibu: '4', foto: '', tgl_kematian: '', telp: '08333333333', email: '', panggilan: 'Rina', lokasi: 'Surabaya', catatan: '' },
            { id: '8', nama: 'Ahmad Santoso', tgl_lahir: '15 Januari 2010', Umur: '16', jenis_kelamin: 'L', id_pasangan: '', id_ayah: '5', id_ibu: '6', foto: '', tgl_kematian: '', telp: '', email: '', panggilan: 'Ahmad', lokasi: 'Jakarta', catatan: 'Masih sekolah' },
            { id: '9', nama: 'Nuri Santoso', tgl_lahir: '10 September 2012', Umur: '13', jenis_kelamin: 'P', id_pasangan: '', id_ayah: '5', id_ibu: '6', foto: '', tgl_kematian: '', telp: '', email: '', panggilan: 'Nuri', lokasi: 'Jakarta', catatan: 'Masih sekolah' }
        ];
        
        console.log('✅ Loaded dummy data (new format):', dummyData.length, 'records');
        return this._validateDummyData(dummyData);
    }

    /**
     * Validate dummy data (NEW FORMAT)
     */
    _validateDummyData(data) {
        const validated = [];
        
        for (const row of data) {
            // Normalize gender: L/P → male/female
            let gender = 'male';
            if (row.jenis_kelamin) {
                const genderVal = String(row.jenis_kelamin).trim().toUpperCase();
                if (genderVal === 'P' || genderVal === 'PEREMPUAN') {
                    gender = 'female';
                }
            }

            // Parse pasangan
            const pasanganId = String(row.id_pasangan || '').trim();
            const pids = pasanganId ? [pasanganId] : [];

            const person = {
                id: String(row.id).trim(),
                name: String(row.nama).trim(),
                gender: gender,
                pids: pids,
                fid: String(row.id_ayah || '').trim() || null,
                mid: String(row.id_ibu || '').trim() || null,
                bdate: this._parseDateFlexible(row.tgl_lahir),
                photo: this._validateUrl(row.foto),
                panggilan: String(row.panggilan || '').trim() || null,
                lokasi: String(row.lokasi || '').trim() || null,
                // New fields
                tgl_kematian: this._parseDateFlexible(row.tgl_kematian),
                telp: String(row.telp || '').trim() || null,
                email: String(row.email || '').trim() || null,
                catatan: String(row.catatan || '').trim() || null
            };
            validated.push(person);
        }
        
        this.buildDataMap(validated);
        this.data = validated;
        return validated;
    }

    /**
     * Get person by ID
     */
    getPersonById(id) {
        return this.dataMap[id] || null;
    }

    /**
     * Get all people
     */
    getAllPeople() {
        return this.data;
    }

    /**
     * Search people by name/panggilan
     */
    search(query) {
        if (!query || query.trim() === '') return [];
        
        const searchTerm = query.trim().toLowerCase();
        return this.data.filter(person => 
            person.name.toLowerCase().includes(searchTerm) ||
            (person.panggilan && person.panggilan.toLowerCase().includes(searchTerm))
        );
    }

    /**
     * Get children of a person
     */
    getChildren(personId) {
        return this.data.filter(person => 
            person.fid === personId || person.mid === personId
        );
    }

    /**
     * Get parent IDs
     */
    getParents(personId) {
        const person = this.getPersonById(personId);
        if (!person) return [];
        const parents = [];
        if (person.fid) parents.push(person.fid);
        if (person.mid) parents.push(person.mid);
        return parents;
    }

    /**
     * Get partners
     */
    getPartners(personId) {
        const person = this.getPersonById(personId);
        if (!person || person.pids.length === 0) return [];
        return person.pids
            .map(pid => this.getPersonById(pid))
            .filter(p => p !== null);
    }

    /**
     * Find tree root (person(s) without parents)
     */
    findRoots() {
        return this.data.filter(person => !person.fid && !person.mid);
    }

    /**
     * Get age from birthdate
     */
    calculateAge(bdate) {
        if (!bdate) return null;
        const birthDate = new Date(bdate);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        
        return age >= 0 ? age : null;
    }

    /**
     * Format date for display
     */
    formatDate(dateString) {
        if (!dateString) return '-';
        const date = new Date(dateString + 'T00:00:00Z');
        return date.toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
}

// Create global instance
const dataManager = new DataManager();
