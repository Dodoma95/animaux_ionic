import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { IonReorderGroup } from '@ionic/angular';

@Component({
  selector: 'app-play',
  templateUrl: './play.page.html',
  styleUrls: ['./play.page.scss'],
})
export class PlayPage implements OnInit {


  animals = [
    {
      'title': 'Vache',
      'image': 'imgs/animals/cow-icon.png',
      'desc': 'Meugle',
      'file': '/sounds/cow.mp3',
      'playing': false
    },
    {
      'title': 'Dauphin',
      'image': 'imgs/animals/dolphin-icon.png',
      'desc': 'Siffle',
      'file': '/sounds/dolphin.mp3',
      'playing': false
    },
    {
      'title': 'Grenouille',
      'image': 'imgs/animals/frog-icon.png',
      'desc': 'Coasse',
      'file': '/sounds/frog.mp3',
      'playing': false
    },
    {
      'title': 'Oiseau',
      'image': 'imgs/animals/bird-icon.png',
      'desc': 'Chante',
      'file': '/sounds/bird.mp3',
      'playing': false
    },
    {
      'title': 'Cochon',
      'image': 'imgs/animals/pig-icon.png',
      'desc': 'Grogne',
      'file': '/sounds/pig.mp3',
      'playing': false
    },
    {
      'title': 'Chien',
      'image': 'imgs/animals/puppy-icon.png',
      'desc': 'Aboie',
      'file': '/sounds/dog.mp3',
      'playing': false
    },
    {
      'title': 'Chat',
      'image': 'imgs/animals/black-cat-icon.png',
      'desc': 'Miaule',
      'file': '/sounds/cat.mp3',
      'playing': false
    },
    {
      'title': 'Cheval',
      'image': 'imgs/animals/horse-icon.png',
      'desc': 'Hennit',
      'file': '/sounds/horse.wav',
      'playing': false
    },
    {
      'title': 'Ane',
      'image': 'imgs/animals/donkey-icon.png',
      'desc': 'Brait',
      'file': '/sounds/donkey.wav',
      'playing': false
    }
  ];

  private currentAnimalPos = null;
  private media = null;

  constructor(public toastCtrl: ToastController) { }

  reorderDisabled = true;

  playSound() {
    //choisir un animal au hasard si aucun n'a deja été choisi
    if(this.currentAnimalPos == null) {
      this.currentAnimalPos = Math.floor(Math.random() * this.animals.length);
    }
    let animal = this.animals[this.currentAnimalPos];

    //Instanciation d'un objet audio
    this.media = new Audio("/assets" + animal.file);
    //Chargement du son
    this.media.load();
    //Lecture du son
    this.media.play();
  }


  validateSound(choiceAnimalPlayer) {
    let message = "";
    
      if (this.currentAnimalPos == choiceAnimalPlayer) {
        let animal = this.animals[choiceAnimalPlayer];
        message = "tu as trouvé, c'est bien " + animal.title + " qui fait le bruit " + animal.desc;
        //Réinitialisation du jeu
        this.currentAnimalPos = null;
        this.media = null;
      } else if (this.currentAnimalPos == null) {
        message = "Il faut d'abord jouer avant de choisir un animal";
      } else {
        message = "T'un con ou quoi, recommence !!!";
      }
      console.log(message);
      this.showToast(message);
    
  }


  private async showToast(message) {
    const toast = await this.toastCtrl.create({
      header: 'Message :',
      message: message,
      position: 'top',
      duration: 3000

    });
    toast.present();
  }

  reorderAnimal(even) {
    //fonction qui va permettre de permuter des ion item entre eux
    let animal = this.animals[even.detail.from];//position de départ de l'élément selectionné
    //Suppression a la position de depart
    this.animals.splice(even.detail.from, 1);
    //Insertion a la position d'arrivee
    this.animals.splice(even.detail.to, 0, animal);// dernier argument sera ce qui sera inséré a la suite
    //Finalisation du reagencement
    even.detail.complete();
  }

  ngOnInit() {
  }

}


 

