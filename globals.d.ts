// globals.d.ts
declare global {
    interface Window {
      $: typeof import('jquery');
      jQuery: typeof import('jquery');
      BunyadLazyConf?: { type: string }; // Ajoutez cette ligne pour la configuration de BunyadLazyConf
    }
  }
  
// types.d.ts

declare module "react-cookie-consent";

// --- AJOUTS POUR LES CSS ---
declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}

// Pour FontAwesome spécifiquement si l'erreur persiste
declare module "@fortawesome/fontawesome-free/css/all.min.css";

// --- AJOUTS POUR LES IMAGES (Optionnel mais conseillé) ---
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.svg";
declare module "*.webp";

export {};

  