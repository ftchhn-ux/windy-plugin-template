<div class="plugin__mobile-header">Airspace Plugin</div>
<div class="plugin__content">
    <h4>Thailand TMA</h4>
    
    <div class="toggle-container">
        <label class="switch">
            <input type="checkbox" bind:checked={isLayerVisible}>
            <span class="slider round"></span>
        </label>
        <span class="toggle-label">Show Airspace</span>
    </div>

    <div style="font-size: 14px; color: #ff9900; font-weight: bold; margin-top: 15px;">
        {statusMessage}
    </div>

    <div class="donation-container">
        <a href="https://ko-fi.com/chai43542" target="_blank" rel="noopener noreferrer" class="kofi-button">
            ☕ Buy me a coffee
        </a>
    </div>
</div>

<script context="module">
    let persistentAirspaceLayer = null;
    let rememberedToggleState = true; 
</script>

<script>
    import { onMount } from 'svelte';
    import { map } from '@windy/map';
    import rawData from './thailand-tma.js';

    let isLayerVisible = rememberedToggleState;
    let statusMessage = "Status: Initializing...";

    onMount(() => {
        if (persistentAirspaceLayer && map.hasLayer(persistentAirspaceLayer)) {
            map.removeLayer(persistentAirspaceLayer);
        }
        
        persistentAirspaceLayer = window.L.layerGroup();
        let count = 0;

        try {
            const actualData = rawData?.default || rawData;
            if (actualData && actualData.features) {
                actualData.features.forEach((feature) => {
                    window.L.geoJSON(feature, {
                        style: { 
                            color: '#ffb84d', weight: 1.5, opacity: 0.9, 
                            fillColor: '#ff9900', fillOpacity: 0.25, 
                            interactive: true 
                        },
                        onEachFeature: (feature, layer) => {
                            const zoneName = feature.properties?.name || "Unknown Airspace Zone";
                            layer.bindPopup(
                                `<div style="font-size: 14px; font-weight: bold; color: #333; text-align: center;">${zoneName}</div>`
                            );
                        }
                    }).addTo(persistentAirspaceLayer);
                    count++;
                });
                
                statusMessage = `Active: ${count} Airspace Zones`;
                
            } else {
                statusMessage = "Error: Could not read features.";
            }
        } catch (err) {
            console.error("Drawing Error:", err);
            statusMessage = "Error drawing shapes.";
        }

        if (isLayerVisible) {
            persistentAirspaceLayer.addTo(map);
        }
    });

    // 3. THE SVELTE WATCHER
    $: {
        rememberedToggleState = isLayerVisible; 
        
        if (persistentAirspaceLayer) {
            if (isLayerVisible && !map.hasLayer(persistentAirspaceLayer)) {
                persistentAirspaceLayer.addTo(map);
            } else if (!isLayerVisible && map.hasLayer(persistentAirspaceLayer)) {
                map.removeLayer(persistentAirspaceLayer);
            }
        }
    }
</script>

<style>
    .plugin__content { padding: 15px; color: white; }
    
    .toggle-container { display: flex; align-items: center; margin-top: 15px; }
    .toggle-label { margin-left: 10px; font-size: 15px; font-weight: bold; cursor: pointer; }
    
    .switch { position: relative; display: inline-block; width: 40px; height: 22px; }
    .switch input { opacity: 0; width: 0; height: 0; }
    
    .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #555; transition: .4s; }
    .slider:before { position: absolute; content: ""; height: 16px; width: 16px; left: 3px; bottom: 3px; background-color: white; transition: .4s; }
    
    input:checked + .slider { background-color: #ff9900; }
    input:checked + .slider:before { transform: translateX(18px); }
    .slider.round { border-radius: 22px; }
    .slider.round:before { border-radius: 50%; }

    .donation-container { 
        margin-top: 25px; 
        padding-top: 15px;
        border-top: 1px solid #555; 
    }
    
    .kofi-button {
        display: inline-block;
        background-color: #29abe0; 
        color: white !important;
        padding: 8px 16px;
        border-radius: 8px;
        text-decoration: none;
        font-weight: bold;
        font-size: 14px;
        transition: background-color 0.2s;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    }
    
    .kofi-button:hover {
        background-color: #1a8fbf; 
        text-decoration: none;
    }
</style>