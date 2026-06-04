/* ===========================
   MODAL.JS - Profile Detail Modal
   Handles profile modal display and data population
   =========================== */

class ModalManager {
    constructor() {
        this.modal = document.getElementById('profileModal');
        this.backdrop = document.getElementById('modalBackdrop');
        this.closeBtn = document.getElementById('modalCloseBtn');
        
        this._setupEventListeners();
    }

    /**
     * Setup event listeners
     */
    _setupEventListeners() {
        this.closeBtn.addEventListener('click', () => this.closeModal());
        this.backdrop.addEventListener('click', () => this.closeModal());
        
        // Prevent modal close when clicking inside modal content
        document.querySelector('.modal-content').addEventListener('click', (e) => {
            e.stopPropagation();
        });
        
        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.style.display === 'flex') {
                this.closeModal();
            }
        });
    }

    /**
     * Open modal and populate with person data
     */
    openModal(personId) {
        const person = dataManager.getPersonById(personId);
        if (!person) {
            console.warn('Person not found:', personId);
            return;
        }

        console.log('Opening modal for:', person.name);
        this.populateModal(person);
        this.modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent scroll
    }

    /**
     * Close modal
     */
    closeModal() {
        this.modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scroll
    }

    /**
     * Populate modal with person data
     */
    populateModal(person) {
        // Profile Photo
        const photoElement = document.getElementById('profilePhoto');
        if (person.photo) {
            photoElement.src = person.photo;
            photoElement.onerror = () => {
                // Fallback to default avatar on image load error
                photoElement.src = this._getDefaultAvatar(person.gender);
            };
            photoElement.className = 'profile-photo';
        } else {
            photoElement.src = this._getDefaultAvatar(person.gender);
            photoElement.className = `profile-photo ${person.gender}-default`;
        }

        // Name
        document.getElementById('profileName').textContent = person.name;

        // Panggilan (Nickname)
        const panggilanElement = document.getElementById('profilePanggilan');
        if (person.panggilan) {
            panggilanElement.textContent = `"${person.panggilan}"`;
            panggilanElement.style.display = 'block';
        } else {
            panggilanElement.style.display = 'none';
        }

        // Gender
        const genderText = person.gender === 'male' ? 'Laki-laki' : 'Perempuan';
        document.getElementById('profileGender').textContent = `👤 ${genderText}`;

        // Birth Date
        const bdateElement = document.getElementById('bdateValue');
        if (person.bdate) {
            const formattedDate = dataManager.formatDate(person.bdate);
            const age = dataManager.calculateAge(person.bdate);
            bdateElement.textContent = formattedDate + (age ? ` (${age} tahun)` : '');
            document.getElementById('profileBdate').style.display = 'block';
        } else {
            document.getElementById('profileBdate').style.display = 'none';
        }

        // Location
        const lokasiElement = document.getElementById('lokasiValue');
        if (person.lokasi) {
            lokasiElement.textContent = person.lokasi;
            document.getElementById('profileLokasi').style.display = 'block';
        } else {
            document.getElementById('profileLokasi').style.display = 'none';
        }

        // Death Date
        const tglKematianElement = document.getElementById('tglKematianValue');
        if (person.tgl_kematian) {
            const formattedDate = dataManager.formatDate(person.tgl_kematian);
            tglKematianElement.textContent = formattedDate;
            document.getElementById('profileTglKematian').style.display = 'block';
        } else {
            document.getElementById('profileTglKematian').style.display = 'none';
        }

        // Contact Info
        const contactSection = document.getElementById('contactSection');
        const hasTelp = person.telp && person.telp.trim() !== '';
        const hasEmail = person.email && person.email.trim() !== '';

        if (hasTelp) {
            document.getElementById('telpValue').textContent = person.telp;
            document.getElementById('profileTelp').style.display = 'block';
        } else {
            document.getElementById('profileTelp').style.display = 'none';
        }

        if (hasEmail) {
            document.getElementById('emailValue').textContent = person.email;
            document.getElementById('profileEmail').style.display = 'block';
        } else {
            document.getElementById('profileEmail').style.display = 'none';
        }

        contactSection.style.display = (hasTelp || hasEmail) ? 'block' : 'none';

        // Notes/Catatan
        const notesSection = document.getElementById('notesSection');
        if (person.catatan) {
            document.getElementById('profileCatatan').textContent = person.catatan;
            notesSection.style.display = 'block';
        } else {
            notesSection.style.display = 'none';
        }

        // Relationships
        this._populateRelationships(person);
    }

    /**
     * Populate relationships section
     */
    _populateRelationships(person) {
        const parentsSection = document.getElementById('parentsSection');
        const partnersSection = document.getElementById('partnersSection');
        const childrenSection = document.getElementById('childrenSection');
        
        // Hide all sections first
        parentsSection.style.display = 'none';
        partnersSection.style.display = 'none';
        childrenSection.style.display = 'none';

        // Parents
        const parents = [];
        if (person.fid) {
            const father = dataManager.getPersonById(person.fid);
            if (father) parents.push(father);
        }
        if (person.mid) {
            const mother = dataManager.getPersonById(person.mid);
            if (mother) parents.push(mother);
        }

        if (parents.length > 0) {
            const parentNames = parents.map(p => p.name).join(', ');
            document.getElementById('parentsList').textContent = parentNames;
            parentsSection.style.display = 'block';
        }

        // Partners
        const partners = dataManager.getPartners(person.id);
        if (partners.length > 0) {
            const partnerNames = partners.map(p => p.name).join(', ');
            document.getElementById('partnersList').textContent = partnerNames;
            partnersSection.style.display = 'block';
        }

        // Children
        const children = dataManager.getChildren(person.id);
        if (children.length > 0) {
            const childNames = children.map(c => c.name).join(', ');
            document.getElementById('childrenList').textContent = childNames;
            childrenSection.style.display = 'block';
        }
    }

    /**
     * Get default avatar SVG
     */
    _getDefaultAvatar(gender) {
        if (gender === 'female') {
            return 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Ccircle cx="50" cy="50" r="50" fill="%23ec4899"/%3E%3Ccircle cx="50" cy="35" r="15" fill="white"/%3E%3Cpath d="M30 55 Q50 65 70 55 L65 90 L35 90 Z" fill="white"/%3E%3C/svg%3E';
        } else {
            return 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Ccircle cx="50" cy="50" r="50" fill="%232563eb"/%3E%3Ccircle cx="50" cy="30" r="12" fill="white"/%3E%3Cpath d="M35 50 L50 45 L65 50 L60 90 L40 90 Z" fill="white"/%3E%3C/svg%3E';
        }
    }

    /**
     * Check if modal is open
     */
    isOpen() {
        return this.modal.style.display === 'flex';
    }
}

// Create global instance
const modalManager = new ModalManager();
