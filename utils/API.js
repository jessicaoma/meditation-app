const BASE_API = 'http://apikarimtempletest.azurewebsites.net/api/';

class Api {
  async getMeditaciones() {
    //const query = await fetch(`${BASE_API}meditaciones`);
    //const data = await query.json();
    //return data;
    return [
      {
        id: 'med1',
        title: 'Meditación Básica',
        color: '#7883a4',
        backgroundImage: 'http://okoconnect.com/karim/images/meditar2-full.png',
        itemImage: 'http://okoconnect.com/karim/images/meditar2.png',
        intro: 'http://okoconnect.com/karim/videos/pre_meditacion.mp4',
        media: 'http://okoconnect.com/karim/meditaciones/Meditacion-Basica.mp3',
        isFree: true,
      },
      {
        id: 'med2',
        title: 'Meditación 2',
        color: '#7883a4',
        backgroundImage: 'http://okoconnect.com/karim/images/meditar4-full.png',
        itemImage: 'http://okoconnect.com/karim/images/meditar4.png',
        intro: 'http://okoconnect.com/karim/videos/pre_meditacion.mp4',
        media: 'http://okoconnect.com/karim/meditaciones/Meditacion-Basica.mp3',
        isFree: true,
      },
      {
        id: 'med3',
        title: 'Meditación 3',
        color: '#7883a4',
        backgroundImage: 'http://okoconnect.com/karim/images/meditar1-full.png',
        itemImage: 'http://okoconnect.com/karim/images/meditar1.png',
        intro: 'http://okoconnect.com/karim/videos/pre_meditacion.mp4',
        media: 'http://okoconnect.com/karim/meditaciones/Meditacion-Basica.mp3',
        isFree: true,
      },
      {
        id: 'med4',
        title: 'Meditación 4',
        color: '#7883a4',
        backgroundImage: 'http://okoconnect.com/karim/images/meditar3-full.png',
        itemImage: 'http://okoconnect.com/karim/images/meditar3.png',
        intro: 'http://okoconnect.com/karim/videos/pre_meditacion.mp4',
        media: 'http://okoconnect.com/karim/meditaciones/Meditacion-Basica.mp3',
        isFree: true,
      },
      {
        id: 'med5',
        title: 'Meditación 5',
        color: '#7883a4',
        backgroundImage: 'http://okoconnect.com/karim/images/meditar2-full.png',
        itemImage: 'http://okoconnect.com/karim/images/meditar2.png',
        intro: 'http://okoconnect.com/karim/videos/pre_meditacion.mp4',
        media: 'http://okoconnect.com/karim/meditaciones/Meditacion-Basica.mp3',
        isFree: true,
      },
      {
        id: 'med6',
        title: 'Meditación 6',
        color: '#7883a4',
        backgroundImage: 'http://okoconnect.com/karim/images/meditar4-full.png',
        itemImage: 'http://okoconnect.com/karim/images/meditar4.png',
        intro: 'http://okoconnect.com/karim/videos/pre_meditacion.mp4',
        media: 'http://okoconnect.com/karim/meditaciones/Meditacion-Basica.mp3',
        isFree: true,
      },
      {
        id: 'med7',
        title: 'Meditación 7',
        color: '#7883a4',
        backgroundImage: 'http://okoconnect.com/karim/images/meditar1-full.png',
        itemImage: 'http://okoconnect.com/karim/images/meditar1.png',
        intro: 'http://okoconnect.com/karim/videos/pre_meditacion.mp4',
        media: 'http://okoconnect.com/karim/meditaciones/Meditacion-Basica.mp3',
        isFree: true,
      },
      {
        id: 'med8',
        title: 'Meditación 8',
        color: '#7883a4',
        backgroundImage: 'http://okoconnect.com/karim/images/meditar3-full.png',
        itemImage: 'http://okoconnect.com/karim/images/meditar3.png',
        intro: 'http://okoconnect.com/karim/videos/pre_meditacion.mp4',
        media: 'http://okoconnect.com/karim/meditaciones/Meditacion-Basica.mp3',
        isFree: true,
      },
      {
        id: 'med9',
        title: 'Meditación 9',
        color: '#7883a4',
        backgroundImage: 'http://okoconnect.com/karim/images/meditar2-full.png',
        itemImage: 'http://okoconnect.com/karim/images/meditar2.png',
        intro: 'http://okoconnect.com/karim/videos/pre_meditacion.mp4',
        media: 'http://okoconnect.com/karim/meditaciones/Meditacion-Basica.mp3',
        isFree: true,
      },
      {
        id: 'med10',
        title: 'Meditación 10',
        color: '#7883a4',
        backgroundImage: 'http://okoconnect.com/karim/images/meditar4-full.png',
        itemImage: 'http://okoconnect.com/karim/images/meditar4.png',
        intro: 'http://okoconnect.com/karim/videos/pre_meditacion.mp4',
        media: 'http://okoconnect.com/karim/meditaciones/Meditacion-Basica.mp3',
        isFree: true,
      },
    ];
  }

  async getAudiolibros() {
    /*const query = await fetch(`${BASE_API}audiolibros`);
    const data = await query.json();
    return data;*/
    return [
      {
        id: 'aud1',
        title: 'La aventura espiritual',
        itemImage: 'http://okoconnect.com/karim/images/libro3.png',
        color: '#82d3ea',
        backgroundImage: 'http://okoconnect.com/karim/images/libro3-.png',
        media: 'http://okoconnect.com/karim/meditaciones/Meditacion-Basica.mp3',
        isFree: true,
      },
      {
        id: 'aud2',
        title: 'Aprendiendo a Meditar',
        itemImage: 'http://okoconnect.com/karim/images/libro2.png',
        color: '#50628e',
        backgroundImage: 'http://okoconnect.com/karim/images/libro2-.png',
        media: 'http://okoconnect.com/karim/meditaciones/Meditacion-Basica.mp3',
        isFree: true,
      },
      {
        id: 'aud3',
        title: '101 Frases para reflexionar',
        itemImage: 'http://okoconnect.com/karim/images/libro1.png',
        color: '#ffffff',
        backgroundImage: 'http://okoconnect.com/karim/images/libro1-.png',
        media: 'http://okoconnect.com/karim/meditaciones/Meditacion-Basica.mp3',
        isFree: true,
      },
    ];
  }

  async getAngelMessage() {
    /*const query = await fetch(`${BASE_API}angelmessage`);
    const data = await query.json();
    return data;*/
    return {
      id: 'mes1',
      title: 'El ángel de la abundancia',
      sentence:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    };
  }
}

export default new Api();
