interface Image {
    name: string;
    image: any;
  }
  
  export class BackgroundImage {
    private static images: Array<Image> = [
      {
        name: 'one.png',
        image: require('../../assets/imgs/one.png'),
      },
      {
        name: 'two.png',
        image: require('../../assets/imgs/two.png'),
      },
      {
        name: 'three.png',
        image: require('../../assets/imgs/three.png'),
      },
      {
        name: 'four.png',
        image: require('../../assets/imgs/four.png'),
      },
      {
        name: 'five.png',
        image: require('../../assets/imgs/five.png'),
      },
      {
        name: 'first.png',
        image: require('../../assets/imgs/first.png'),
      },
      {
        name: 'second.png',
        image: require('../../assets/imgs/second.png'),
      },
      {
        name: 'third.png',
        image: require('../../assets/imgs/third.png'),
      },
      {
        name: 'fourth.png',
        image: require('../../assets/imgs/fourth.png'),
      },
      {
        name: 'fifth.png',
        image: require('../../assets/imgs/fifth.png'),
      },
      {
        name: 'monday.png',
        image: require('../../assets/imgs/monday.png'),
      },
      {
        name: 'tuesday.png',
        image: require('../../assets/imgs/tuesday.png'),
      },
      {
        name: 'wednesday.png',
        image: require('../../assets/imgs/wednesday.png'),
      },
      {
        name: 'thursday.png',
        image: require('../../assets/imgs/thursday.png'),
      },
      {
        name: 'friday.png',
        image: require('../../assets/imgs/friday.png'),
      },
      {
        name: 'saturday.png',
        image: require('../../assets/imgs/saturday.png'),
      },
      {
        name: 'sunday.png',
        image: require('../../assets/imgs/sunday.png'),
      },
      {
        name: 'calendar_white.png',
        image: require('../../assets/icons/calendar_white.png'),
      },
      {
        name: 'czech-republic.png',
        image: require('../../assets/icons/czech-republic.png'),
      },
      {
        name: 'numbers_white.png',
        image: require('../../assets/icons/numbers_white.png'),
      },
      {
        name: 'vietnam.png',
        image: require('../../assets/icons/vietnam.png'),
      },
      {
        name: 'favicon.png',
        image: require('../../assets/icons/favicon.png'),
      },
    ];
  
    static GetImage = (name: string) => {
      const found = BackgroundImage.images.find(e => e.name === name);
      return found ? found.image : null;
    };
  }