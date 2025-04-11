import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {

    getLogin(){
        return "<h1>Connexion</h1>";
    }
    login(){
        return "<h1>>Je suis connecté</h1>";
    }

    getSignup(){
        return "<h1>Inscription</h1>";
    }
    signup(){
        return "<h1>Bienvenue nouvel utilisateur</h1>";
    }
}
