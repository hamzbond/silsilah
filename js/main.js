/* ===========================
   MAIN.JS - Application Entry Point
   Orchestrates all modules and handles initialization
   =========================== */

class Application {
    constructor() {
        this.loadingIndicator = document.getElementById('loadingIndicator');
        this.errorContainer = document.getElementById('errorContainer');
        this.lastUpdated = document.getElementById('lastUpdated');
        this.data = [];
    }

    /**
     * Initialize the application
     */
    async init() {
        try {
            console.log('🌳 Silsilah Keluarga - Initializing...');
            
            // Load data from Google Sheets
            this.data = await dataManager.loadData();
            console.log(`✅ Loaded ${this.data.length} people`);

            // Determine view mode (cards | list | balkan)
            this.viewMode = localStorage.getItem('viewMode') || 'cards';

            // Initialize tree visualization with current view mode
            await treeManager.initializeTree(this.data, this.viewMode);
            console.log('✅ Family tree initialized (mode=' + this.viewMode + ')');

            // Wire view toggle UI
            this._wireViewToggle();
            this.viewMode = localStorage.getItem('viewMode') || 'tree';

            // Setup tree node click handlers
            treeManager.onNodeClick((nodeId) => {
                modalManager.openModal(nodeId);
            });

            // Render birthday widget
            birthdayManager.renderWidget(this.data);
            console.log('✅ Birthday widget rendered');

            // Update last updated timestamp
            this._updateLastUpdatedTime();

            // Hide loading indicator
            this.loadingIndicator.style.display = 'none';
            
            console.log('🎉 Application ready!');
        } catch (error) {
            this._handleError(error);
        }
    }

    _wireViewToggle() {
        const treeBtn = document.getElementById('viewTreeBtn');
        const cardsBtn = document.getElementById('viewCardsBtn');
        const listBtn = document.getElementById('viewListBtn');
        if (!cardsBtn || !listBtn || !treeBtn) return;

        const setActive = (mode) => {
            treeBtn.classList.toggle('active', mode === 'tree');
            cardsBtn.classList.toggle('active', mode === 'cards');
            listBtn.classList.toggle('active', mode === 'list');
        };

        setActive(this.viewMode);

        // Tambahkan event listener untuk Tree
        treeBtn.addEventListener('click', async () => {
            if (this.viewMode === 'tree') return;
            this.viewMode = 'tree';
            localStorage.setItem('viewMode', this.viewMode);
            setActive(this.viewMode);
            await treeManager.initializeTree(this.data, this.viewMode);
        });

        cardsBtn.addEventListener('click', async () => {
            if (this.viewMode === 'cards') return;
            this.viewMode = 'cards';
            localStorage.setItem('viewMode', this.viewMode);
            setActive(this.viewMode);
            await treeManager.initializeTree(this.data, this.viewMode);
        });

        listBtn.addEventListener('click', async () => {
            if (this.viewMode === 'list') return;
            this.viewMode = 'list';
            localStorage.setItem('viewMode', this.viewMode);
            setActive(this.viewMode);
            await treeManager.initializeTree(this.data, this.viewMode);
        });
    }

    /**
     * Handle errors
     */
    _handleError(error) {
        console.error('❌ Error:', error);
        
        // Hide loading indicator
        this.loadingIndicator.style.display = 'none';

        // Show error container
        this.errorContainer.style.display = 'flex';
        document.getElementById('errorMessage').textContent = error.message || 'An unknown error occurred';
    }

    /**
     * Update "last updated" timestamp
     */
    _updateLastUpdatedTime() {
        const now = new Date();
        const timeString = now.toLocaleString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        this.lastUpdated.textContent = timeString;
    }
}

// Create global application instance
const app = new Application();

// Initialize application when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        app.init();
    });
} else {
    app.init();
}

// Handle offline/online status
window.addEventListener('online', () => {
    console.log('🔗 Back online');
});

window.addEventListener('offline', () => {
    console.log('❌ Lost internet connection');
});

// Log when all resources are loaded
window.addEventListener('load', () => {
    console.log('📦 All resources loaded');
});

// Handle unhandled errors
window.addEventListener('error', (event) => {
    console.error('Unhandled error:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
});
