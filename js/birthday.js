/* ===========================
   BIRTHDAY.JS - Birthday Widget
   Displays birthdays for current month
   =========================== */

class BirthdayManager {
    constructor() {
        this.widget = document.getElementById('birthdayWidget');
        this.list = document.getElementById('birthdayList');
        this.collapseBtn = document.getElementById('widgetCollapseBtn');
        this.isCollapsed = false;
        
        this._setupEventListeners();
    }

    /**
     * Setup event listeners
     */
    _setupEventListeners() {
        this.collapseBtn.addEventListener('click', () => this.toggleCollapse());
    }

    /**
     * Get current month (0-11)
     */
    _getCurrentMonth() {
        return new Date().getMonth();
    }

    /**
     * Get birthdays for current month
     */
    getBirthdaysThisMonth(data) {
        const currentMonth = this._getCurrentMonth();
        
        const birthdays = data
            .filter(person => person.bdate)
            .filter(person => {
                const birthDate = new Date(person.bdate + 'T00:00:00Z');
                return birthDate.getMonth() === currentMonth;
            })
            .sort((a, b) => {
                // Sort by day of month
                const dayA = new Date(a.bdate).getDate();
                const dayB = new Date(b.bdate).getDate();
                return dayA - dayB;
            });

        return birthdays;
    }

    /**
     * Render birthday widget
     */
    renderWidget(data) {
        const birthdays = this.getBirthdaysThisMonth(data);
        console.log(`Found ${birthdays.length} birthdays this month`);

        if (birthdays.length === 0) {
            this.list.innerHTML = '<p class="loading-text">Tidak ada ulang tahun bulan ini 📅</p>';
            return;
        }

        // Create birthday items
        let html = '';
        for (const person of birthdays) {
            const birthDate = new Date(person.bdate + 'T00:00:00Z');
            const day = birthDate.getDate();
            const monthName = birthDate.toLocaleDateString('id-ID', { month: 'short' });
            const age = dataManager.calculateAge(person.bdate);

            html += `
                <div class="birthday-item" onclick="birthdayManager._handleBirthdayClick('${person.id}')">
                    <span class="birthday-emoji">🎂</span>
                    <div class="birthday-item-text">
                        <div class="birthday-name">${this._escapeHtml(person.name)}</div>
                        <div class="birthday-date">${day} ${monthName}${age ? ` (${age + 1} thn)` : ''}</div>
                    </div>
                </div>
            `;
        }

        this.list.innerHTML = html;
    }

    /**
     * Handle birthday item click
     */
    _handleBirthdayClick(personId) {
        console.log('Birthday item clicked:', personId);
        
        // Focus on tree
        treeManager.focusNode(personId);
        treeManager.highlightNodes(personId);

        // Open modal
        modalManager.openModal(personId);
    }

    /**
     * Toggle collapse state
     */
    toggleCollapse() {
        this.isCollapsed = !this.isCollapsed;
        
        if (this.isCollapsed) {
            this.widget.classList.add('collapsed');
            this.collapseBtn.textContent = '+';
        } else {
            this.widget.classList.remove('collapsed');
            this.collapseBtn.textContent = '−';
        }

        console.log('Birthday widget collapsed:', this.isCollapsed);
    }

    /**
     * Escape HTML special characters
     */
    _escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * Refresh widget with new data
     */
    refresh(data) {
        console.log('Refreshing birthday widget...');
        this.renderWidget(data);
    }
}

// Create global instance
const birthdayManager = new BirthdayManager();
