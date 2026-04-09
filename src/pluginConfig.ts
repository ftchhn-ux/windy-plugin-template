import type { ExternalPluginConfig } from '@windy/interfaces';

const config: ExternalPluginConfig = {
    // 1. Give it a unique, descriptive name (must start with 'windy-plugin-')
    name: 'windy-plugin-thailand-airspace', 
    
    // 2. Since it works perfectly, let's call it version 1!
    version: '1.2.0', 
    
    // 3. A nice aviation icon instead of the default plug
    icon: '✈️', 
    
    // 4. What users will see in the menu
    title: 'Thailand Airspace TMA', 
    description: 'Interactive Airspace mapping and control zones for Thailand.',
    
    // 5. Put your actual name or developer handle here
    author: 'FRAGEN', 
    
    // 6. CRITICAL: Update this to YOUR actual GitHub repository link!
    repository: 'https://github.com/ftchhn-ux/windy-plugin-template', 
    
    desktopUI: 'rhpane',
    mobileUI: 'fullscreen',
    
    // 7. Update the URL path to match your new name
    routerPath: '/thailand-airspace', 
    
    // 8. CRITICAL: Change this to false so it can be published!
    private: false, 
};

export default config;