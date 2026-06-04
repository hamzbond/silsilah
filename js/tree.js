/* ===========================
   TREE.JS - BALKAN Integration
   Handles tree initialization, rendering, and node configuration
   =========================== */

class TreeManager {
    constructor() {
        this.treeContainer = document.getElementById('treeContainer');
        this.familyTree = null;
        this.nodeClickCallbacks = [];
    }

    /**
     * Transform data to BALKAN-compatible format
     */
    transformData(data) {
        console.log('Transforming data for BALKAN...');
        
        const balkanData = [];
        
        for (const person of data) {
            const node = {
                id: person.id,
                pid: person.pids.length > 0 ? person.pids.map(pid => ({ id: pid })) : [],
                mid: person.mid ? person.mid : null,
                fid: person.fid ? person.fid : null,
                name: person.name,
                gender: person.gender,
                image: person.photo || this._getDefaultImage(person.gender),
                
                // Additional data for modal
                panggilan: person.panggilan,
                bdate: person.bdate,
                lokasi: person.lokasi
            };
            
            balkanData.push(node);
        }
        
        console.log('Data transformed for BALKAN');
        return balkanData;
    }

    /**
     * Get default avatar based on gender
     */
    _getDefaultImage(gender) {
        // Return a simple placeholder or data URL for default avatars
        if (gender === 'female') {
            return 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Ccircle cx="50" cy="50" r="50" fill="%23ec4899"/%3E%3Ccircle cx="50" cy="35" r="15" fill="white"/%3E%3Cpath d="M30 55 Q50 65 70 55 L65 90 L35 90 Z" fill="white"/%3E%3C/svg%3E';
        } else {
            return 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Ccircle cx="50" cy="50" r="50" fill="%232563eb"/%3E%3Ccircle cx="50" cy="30" r="12" fill="white"/%3E%3Cpath d="M35 50 L50 45 L65 50 L60 90 L40 90 Z" fill="white"/%3E%3C/svg%3E';
        }
    }

    /**
     * Initialize BALKAN FamilyTree
     */
    async initializeTree(data, viewMode = 'cards') {
        try {
            console.log('Initializing tree view (mode=', viewMode, ')...');

            // If user selected card/grid view, render that first
            if (viewMode === 'cards') {
                this.familyTree = null;
                this._renderCardView(data);
                return;
            }

            // If user explicitly requested 'list' view, render fallback list
            if (viewMode === 'list') {
                this.familyTree = null;
                this._initializeFallbackTree(data);
                return;
            }

            // If FamilyTree library is not loaded, fallback to list view
            if (typeof FamilyTree === 'undefined') {
                console.warn('FamilyTree library not loaded, using fallback list view...');
                this.familyTree = null;
                if (viewMode === 'list') {
                    this._initializeFallbackTree(data);
                } else {
                    // default to fallback list when balkan unavailable
                    this._initializeFallbackTree(data);
                }
                return;
            }

            // Transform data for BALKAN
            const balkanData = this.transformData(data);

            // Find root
            const roots = dataManager.findRoots();
            console.log('Found roots:', roots.map(r => r.id));

            // Create BALKAN instance
            this.familyTree = new FamilyTree(this.treeContainer, {
                nodes: balkanData,
                nodeBinding: {
                    field_0: 'name',
                    field_1: 'gender',
                    img_0: 'image'
                },
                template: 'john',
                enableSearch: false,
                enableDragAndDrop: false,
                enablePan: true,
                enableZoom: true,
                zoom: 1,
                editFormFamily: () => false,
                editForm: () => false,
                nodeMenu: () => false,
                nodeContextMenu: () => false,
                nodeMouseClick: (nodeId) => this._handleNodeClick(nodeId),
                nodeMouseEnter: (nodeId) => this._handleNodeHover(nodeId, true),
                nodeMouseLeave: (nodeId) => this._handleNodeHover(nodeId, false)
            });

            console.log('BALKAN FamilyTree initialized successfully');
            return this.familyTree;
        } catch (error) {
            console.error('Error initializing BALKAN FamilyTree:', error);
            throw error;
        }
    }

    /**
     * Handle node click event
     */
    _handleNodeClick(nodeId) {
        console.log('Node clicked:', nodeId);
        
        // Trigger all registered callbacks
        for (const callback of this.nodeClickCallbacks) {
            callback(nodeId);
        }
    }

    /**
     * Handle node hover event
     */
    _handleNodeHover(nodeId, isHovering) {
        const node = this.familyTree.getNode(nodeId);
        if (node) {
            if (isHovering) {
                node.classList.add('hovered');
            } else {
                node.classList.remove('hovered');
            }
        }
    }

    /**
     * Register callback for node clicks
     */
    onNodeClick(callback) {
        this.nodeClickCallbacks.push(callback);
    }

    /**
     * Highlight node(s)
     */
    highlightNodes(nodeIds) {
        // Clear previous highlights first
        this.clearHighlights();

        // If using BALKAN tree, use its API
        if (this.familyTree) {
            if (Array.isArray(nodeIds)) {
                nodeIds.forEach(id => {
                    const node = this.familyTree.getNode(id);
                    if (node) node.classList.add('highlighted');
                });
            } else {
                const node = this.familyTree.getNode(nodeIds);
                if (node) node.classList.add('highlighted');
            }
            return;
        }

        // If in card/grid or fallback list mode, highlight by data-id attribute
        const ids = Array.isArray(nodeIds) ? nodeIds : [nodeIds];
        ids.forEach(id => {
            const el = this.treeContainer.querySelector(`.person-card[data-id="${id}"]`) || this.treeContainer.querySelector(`.member-item[data-id="${id}"]`);
            if (el) el.classList.add('highlighted');
        });
    }

    /**
     * Clear highlights
     */
    clearHighlights() {
        // Clear for BALKAN nodes
        if (this.familyTree) {
            const highlightedNodes = this.treeContainer.querySelectorAll('.fTreeImg.highlighted');
            highlightedNodes.forEach(node => node.classList.remove('highlighted'));
        }

        // Clear for card/grid and fallback list
        const highlightedCards = this.treeContainer.querySelectorAll('.person-card.highlighted, .member-item.highlighted');
        highlightedCards.forEach(el => el.classList.remove('highlighted'));
    }

    /**
     * Focus on a specific node (center tree view)
     */
    focusNode(nodeId) {
        if (!this.familyTree) return; // Fallback mode
        try {
            const node = this.familyTree.getNode(nodeId);
            if (node) {
                // Scroll to node
                node.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                    inline: 'center'
                });
                console.log('Focused on node:', nodeId);
            }
        } catch (error) {
            console.warn('Error focusing node:', error);
        }
    }

    /**
     * Expand all nodes
     */
    expandAll() {
        if (this.familyTree) {
            this.familyTree.expandAll();
        }
    }

    /**
     * Collapse all nodes
     */
    collapseAll() {
        if (this.familyTree) {
            this.familyTree.collapseAll();
        }
    }

    /**
     * Toggle node expansion
     */
    toggleNode(nodeId) {
        try {
            if (this.familyTree) {
                const node = this.familyTree.getNode(nodeId);
                if (node) {
                    this.familyTree.toggleNode(nodeId);
                }
            }
        } catch (error) {
            console.warn('Error toggling node:', error);
        }
    }

    /**
     * Fallback tree visualization if BALKAN library not available
     */
    _initializeFallbackTree(data) {
        console.log('Using fallback tree visualization...');
        
        let html = '<div class="fallback-tree"><h2>Family Members (Fallback View)</h2>';
        html += '<ul class="members-list">';
        
        for (const person of data) {
            const genderIcon = person.gender === 'female' ? '👩' : '👨';
            html += `
                <li class="member-item" data-id="${person.id}" onclick="modalManager.openModal('${person.id}')">
                    <span class="member-icon">${genderIcon}</span>
                    <span class="member-name">${this._escapeHtml(person.name)}</span>
                    ${person.panggilan ? `<span class="member-panggilan">"${this._escapeHtml(person.panggilan)}"</span>` : ''}
                </li>
            `;
        }
        
        html += '</ul></div>';
        
        const style = `
            <style>
                .fallback-tree { padding: 20px; font-family: sans-serif; }
                .fallback-tree h2 { color: #333; }
                .members-list { list-style: none; padding: 0; }
                .member-item { 
                    padding: 10px; 
                    margin: 8px 0;
                    background: #f5f5f5;
                    border-radius: 8px;
                    cursor: pointer;
                    display: flex;
                    gap: 10px;
                    align-items: center;
                    transition: all 0.2s;
                }
                .member-item:hover {
                    background: #e0e0e0;
                    transform: translateX(5px);
                }
                .member-icon { font-size: 1.5em; }
                .member-name { font-weight: 600; flex: 1; }
                .member-panggilan { color: #888; font-style: italic; }
            </style>
        `;
        
        this.treeContainer.innerHTML = style + html;
    }

    /**
     * Render a responsive card/grid view (primary new view)
     */
    _renderCardView(data) {
        console.log('Rendering card/grid view...');
        const cards = [];
        for (const person of data) {
            const genderClass = person.gender === 'female' ? 'female' : 'male';
            const img = person.photo || this._getDefaultImage(person.gender);
            const year = person.bdate ? (new Date(person.bdate).getFullYear() || '') : '';
            const card = `
                <div class="person-card ${genderClass}" data-id="${person.id}" onclick="modalManager.openModal('${person.id}')">
                    <div class="person-avatar"><img class="avatar-img" src="${img}" alt="${this._escapeHtml(person.name)}"></div>
                    <div class="person-info">
                        <div class="person-name">${this._escapeHtml(person.name)}</div>
                        <div class="person-year">${year}</div>
                    </div>
                    <div class="person-actions">
                        <button class="small-icon" title="Foto">📷</button>
                        <button class="small-icon" title="Edit">✎</button>
                    </div>
                </div>
            `;
            cards.push(card);
        }

        const html = `<div class="card-grid">${cards.join('')}</div>`;
        this.treeContainer.innerHTML = html;
    }

    /**
     * Escape HTML
     */
    _escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * Get BALKAN instance
     */
    getTree() {
        return this.familyTree;
    }

    /**
     * Refresh tree with new data
     */
    async refresh(data) {
        console.log('Refreshing tree...');
        this.treeContainer.innerHTML = '';
        // Try to preserve previous mode if stored
        const stored = localStorage.getItem('viewMode') || 'cards';
        await this.initializeTree(data, stored);
    }
}

// Create global instance
const treeManager = new TreeManager();
