/* ===========================
   SEARCH.JS - Smart Search
   Handles search functionality and result highlighting
   =========================== */

class SearchManager {
    constructor() {
        this.searchInput = document.getElementById('searchInput');
        this.clearBtn = document.getElementById('clearSearchBtn');
        this.currentResults = [];
        this.currentResultIndex = 0;
        
        this._setupEventListeners();
    }

    /**
     * Setup event listeners
     */
    _setupEventListeners() {
        // Search input - debounced
        this.searchInput.addEventListener('input', (e) => {
            this._debounce(() => this._handleSearch(e.target.value), 300);
        });

        // Enter key - go to next result
        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this._focusNextResult();
            }
        });

        // Clear button
        this.clearBtn.addEventListener('click', () => this.clearSearch());
    }

    /**
     * Debounce helper
     */
    _debounce(func, delay) {
        clearTimeout(this._debounceTimer);
        this._debounceTimer = setTimeout(func, delay);
    }

    /**
     * Handle search input
     */
    _handleSearch(query) {
        console.log('Searching for:', query);
        
        if (!query || query.trim() === '') {
            this.clearSearch();
            return;
        }

        // Search for matching people
        const results = dataManager.search(query);
        console.log(`Found ${results.length} results for "${query}"`);

        this.currentResults = results;
        this.currentResultIndex = 0;

        if (results.length > 0) {
            // Show clear button
            this.clearBtn.classList.add('active');

            // Highlight all results
            const resultIds = results.map(r => r.id);
            treeManager.highlightNodes(resultIds);

            // Focus first result
            this._focusCurrentResult();

            // Open modal for first result
            setTimeout(() => {
                modalManager.openModal(results[0].id);
            }, 100);
        } else {
            // No results
            treeManager.clearHighlights();
            console.log('No results found');
        }
    }

    /**
     * Focus on current result
     */
    _focusCurrentResult() {
        if (this.currentResults.length === 0) return;

        const currentPerson = this.currentResults[this.currentResultIndex];
        console.log(`Focusing on result ${this.currentResultIndex + 1}/${this.currentResults.length}: ${currentPerson.name}`);

        // Focus tree on this person
        treeManager.focusNode(currentPerson.id);

        // Highlight only current result
        this._highlightCurrentResult();

        // Update modal
        modalManager.openModal(currentPerson.id);
    }

    /**
     * Highlight only current result
     */
    _highlightCurrentResult() {
        // Clear all highlights
        treeManager.clearHighlights();

        // Highlight current result
        if (this.currentResults.length > 0) {
            const currentId = this.currentResults[this.currentResultIndex].id;
            treeManager.highlightNodes(currentId);
        }
    }

    /**
     * Focus next result
     */
    _focusNextResult() {
        if (this.currentResults.length === 0) return;

        this.currentResultIndex = (this.currentResultIndex + 1) % this.currentResults.length;
        this._focusCurrentResult();
    }

    /**
     * Focus previous result
     */
    _focusPreviousResult() {
        if (this.currentResults.length === 0) return;

        this.currentResultIndex = (this.currentResultIndex - 1 + this.currentResults.length) % this.currentResults.length;
        this._focusCurrentResult();
    }

    /**
     * Clear search
     */
    clearSearch() {
        console.log('Clearing search');
        this.searchInput.value = '';
        this.clearBtn.classList.remove('active');
        this.currentResults = [];
        this.currentResultIndex = 0;
        treeManager.clearHighlights();
        modalManager.closeModal();
    }

    /**
     * Get search results count
     */
    getResultsCount() {
        return this.currentResults.length;
    }

    /**
     * Get current result index (1-based)
     */
    getCurrentResultIndex() {
        return this.currentResults.length > 0 ? this.currentResultIndex + 1 : 0;
    }
}

// Create global instance
const searchManager = new SearchManager();

// Optional: Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + F for search focus
    if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        document.getElementById('searchInput').focus();
    }

    // Tab to navigate search results (when search input is active)
    if (document.activeElement === document.getElementById('searchInput')) {
        if (e.key === 'Enter') {
            e.preventDefault();
            searchManager._focusNextResult();
        }
        if (e.key === 'Shift' && e.key === 'Enter') {
            e.preventDefault();
            searchManager._focusPreviousResult();
        }
    }
});
