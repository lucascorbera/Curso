import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthGoogleServices } from './services/auth-google-services';
import type { IProfileModel } from './Models/profile-model/profile-model-module';

export const authGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthGoogleServices);
    const router = inject(Router);

    const LoggedProfile: IProfileModel = authService.getLoggedProfile();
    if(LoggedProfile){
        return true;
    }else{
        router.navigate(['']);
        return false;
    }
};
