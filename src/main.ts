import { initFederation } from '@angular-architects/native-federation';
import { environment } from '@environments/environment';

const manifest = !environment.remoteModules
  ? 'federation/manifest.json'
  : 'federation/manifest.prod.json';

initFederation(manifest)
  .catch((err) => console.error(err))
  .then((_) => import('./bootstrap'))
  .catch((err) => console.error(err));
