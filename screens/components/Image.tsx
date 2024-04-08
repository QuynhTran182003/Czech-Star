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
        name: 'six.png',
        image: require('../../assets/imgs/six.png'),
      },
      {
        name: 'seven.png',
        image: require('../../assets/imgs/seven.png'),
      },
      {
        name: 'eight.png',
        image: require('../../assets/imgs/eight.png'),
      },
      {
        name: 'nine.png',
        image: require('../../assets/imgs/nine.png'),
      },
      {
        name: 'ten.png',
        image: require('../../assets/imgs/ten.png'),
      },
      {
        name: 'eleven.png',
        image: require('../../assets/imgs/eleven.png'),
      },
      {
        name: 'fifteen.png',
        image: require('../../assets/imgs/fifteen.png'),
      },
      {
        name: 'nineteen.png',
        image: require('../../assets/imgs/nineteen.png'),
      },
      {
        name: 'twenty.png',
        image: require('../../assets/imgs/twenty.png'),
      },
      {
        name: 'thirty.png',
        image: require('../../assets/imgs/thirty.png'),
      },
      {
        name: 'fifty.png',
        image: require('../../assets/imgs/fifty.png'),
      },
      {
        name: 'sixty.png',
        image: require('../../assets/imgs/sixty.png'),
      },
      {
        name: 'ninety.png',
        image: require('../../assets/imgs/ninety.png'),
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
        name: 'january.png',
        image: require('../../assets/imgs/january.png'),
      },
      // {
      //   name: 'febuary.png',
      //   image: require('../../assets/imgs/febuary.png'),
      // },
      {
        name: 'march.png',
        image: require('../../assets/imgs/march.png'),
      },
      {
        name: 'april.png',
        image: require('../../assets/imgs/april.png'),
      },
      {
        name: 'may.png',
        image: require('../../assets/imgs/may.png'),
      },
      {
        name: 'june.png',
        image: require('../../assets/imgs/june.png'),
      },
      {
        name: 'july.png',
        image: require('../../assets/imgs/july.png'),
      },
      {
        name: 'august.png',
        image: require('../../assets/imgs/august.png'),
      },
      {
        name: 'september.png',
        image: require('../../assets/imgs/september.png'),
      },
      {
        name: 'october.png',
        image: require('../../assets/imgs/october.png'),
      },
      {
        name: 'november.png',
        image: require('../../assets/imgs/november.png'),
      },
      {
        name: 'december.png',
        image: require('../../assets/imgs/december.png'),
      },
      {
        name: 'myself.png',
        image: require('../../assets/imgs/myself.png'),
      },
      {
        name: 'you.png',
        image: require('../../assets/imgs/you.png'),
      },
      {
        name: 'we.png',
        image: require('../../assets/imgs/we.png'),
      },
      {
        name: 'they.png',
        image: require('../../assets/imgs/they.png'),
      },
      {
        name: 'you2.png',
        image: require('../../assets/imgs/you2.png'),
      },{
        name: 'her.png',
        image: require('../../assets/imgs/her.png'),
      },
//icons
      {
        name: 'person.png',
        image: require('../../assets/icons/person.png'),
      },
      {
        name: 'conversation.png',
        image: require('../../assets/icons/conversation.png'),
      },
      {
        name: 'calendar.png',
        image: require('../../assets/icons/calendar.png'),
      },
      {
        name: 'czech-republic.png',
        image: require('../../assets/icons/czech-republic.png'),
      },
      {
        name: 'numbers.png',
        image: require('../../assets/icons/numbers.png'),
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