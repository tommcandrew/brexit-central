const timelineData = [
    {
        media: {
            type: 'video',
            src: 'https://www.youtube.com/embed/w87GNWJHtFM',
            title: 'David Cameron announces date of Brexit referendum outside 10 Downing Street'
        },
        date: '20 February 2016',
        text: 'David Cameron announces that the country will vote in a referendum on 23 June.'
    },

    {
        media: {
            type: 'image',
            src: 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2016/06/23/11/referendum-16.jpg?w968h681',
            alt: 'A woman leaves a polling station after voting'
        },
        date: '23 June 2016',
        text: 'The UK votes in the referendum.'
    },

    {
        media: {
            type: 'image',
            src: 'https://static01.nyt.com/images/2016/06/24/world/europe/how-britain-voted-brexit-referendum-1466746689036/how-britain-voted-brexit-referendum-1466746689036-facebookJumbo-v3.png',
            alt: 'A map of the UK showing the referendum results for each region'
        },
        date: '24 June 2016',
        text: 'After it is announced the the UK voted 52 per cent to leave the EU, Cameron resigns as Prime Minister.'
    },

    {
        media: {
            type: 'image',
            src: 'http://www.chinadaily.com.cn/world/images/attachement/jpg/site1/20160704/eca86bd9e0d118e4028704.jpg',
            alt: 'A female demonstrator with the EU flag painted on her face looks at the camera with Big Ben visible in the background'
        },
        date: '2 July 2016',
        text: 'Thousands of anti-Brexit protesters march through the streets of London.'
    },

    {
        media: {
            type: 'image',
            src: 'https://cdn3.img.sputniknews.com/images/105346/72/1053467289.jpg',
            alt: 'Theresa May and her husband stand at the door of 10 Downing STreet waving'
        },
        date: '13 July 2016',
        text: 'Theresa May wins a Conservative Party leadership contest and becomes the second female Prime Minister.'
    },

    {
        media: {
            type: 'image',
            src: 'https://cdn2.theweek.co.uk/sites/theweek/files/2017/03/170331_-_may_signing_article_50_letter.jpg',
            alt: 'Theresa May signs Article 50 at her desk.'
        },
        date: '29 March 2017',
        text: 'May triggers Article 50 of the Lisbon Treaty, officially starting a two-year countdown to the UK exiting the EU.'
    },

    {
        media: {
            type: 'video',
            src: 'https://www.youtube.com/embed/4xr9-CkZZRk',
            title: 'Theresa May announces a general election.'
        },
        date: '18 April 2017',
        text: 'May calls a snap General Election.'
    },

    {
        media: {
            type: 'image',
            src: 'https://www.ft.com/__origami/service/image/v2/images/raw/http%3A%2F%2Fcom.ft.imagepublish.prod.s3.amazonaws.com%2F0688aa3c-4cb4-11e7-a3f4-c742b9791d43?fit=scale-down&source=next&width=700',
            alt: 'A smiling Jeremy Corbyn gives a thumbs up to the camera.'
        },
        date: '9 June 2017',
        text: 'Theresa May\'s election gamble is a failure - the Conservatives lose their majority in parliament.'
    },

    {
        media: {
            type: 'video',
            src: 'https://www.youtube.com/embed/q0N1CTUbouw',
            title: 'Highlights from Theresa May\'s disastrous speech.'
        },
        date: '4 October 2017',
        text: 'May gives a disastrous speech on the last day of the Conservative Party Conference.'
    },

    {
        media: {
            type: 'video',
            src: 'https://www.youtube.com/embed/fn2FlgyZTvE',
            title: 'Footage from the Brexit demonstration.'
        },
        date: '23 June 2018',
        text: '100,000 people take part in a demonstration demanding a second referendum.'
    },

    {
        media: {
            type: 'image',
            src: 'https://cdn.images.express.co.uk/img/dynamic/139/590x/brexit-news-uk-eu-david-davis-boris-johnson-michel-barnier-theresa-may-986207.jpg?r=1532971433900',
            alt: 'A picture showing the faces of Boris Johnson and David Davis.'
        },
        date: '9 July 2018',
        text: 'Brexit Minister David Davis and Foreign Secretary Boris Johnson resign in protest at the Prime Minister\'s Brexit plan. '
    },

    {
        media: {
            type: 'image',
            src: 'https://i1.wp.com/www.reportfocusnews.com/wp-content/uploads/2018/10/Dp81NSgWkAA5ci-.jpg?w=1200&ssl=1',
            alt: 'Demonstrators hold up placards with the faces of various politicians belwo the word liar.'
        },
        date: '20 October 2018',
        text: 'Another march in support of a second referendum attracts 700,000 people in London'
    },

    {
        media: {
            type: 'image',
            src: 'https://pbs.twimg.com/media/DuP_2OSUcAAYc5g.jpg',
            alt: 'Cover of Daily Express with Theresa May\'s face and headline that reads: now just let her get on with it.'
        },
        date: '12 December 2018',
        text: 'The Prime Minister survives a vote of no confidence.'
    },

    {
        media: {
            type: 'video',
            src: 'https://www.youtube.com/embed/jPBK5pChcds',
            title: 'Footage from House of Commons as the Prime Minister\'s bill is defeated.'
        },
        date: '15 January 2019',
        text: 'Theresa May suffers the worst parliamentary defeat in modern history as MPs reject her Brexit deal by a majority of 230.'
    },

    {
        media: {
            type: 'video',
            src: 'https://www.youtube.com/embed/_UI9XcQ0jFc',
            title: 'Theresa May\'s tearful farewell speech outside 10 Downing STreet.'
        },
        date: '24 June 2019',
        text: 'Theresa May resigns with a tearful farewell outside Downing Street.'
    },

    {
        media: {
            type: 'image',
            src: 'https://ichef.bbci.co.uk/news/976/cpsprodpb/0296/production/_108026600_johnson-pg1-afp.jpg',
            alt: 'The new Prime Minister Boris Johnson waves from the steps of 10 Downing Street.'
        },
        date: '24 July 2019',
        text: 'Boris Johnson becomes the new Prime Minister.'
    },

    {
        media: {
            type: 'image',
            src: 'https://media.pri.org/s3fs-public/styles/story_main/public/images/2019/08/my_post_32.jpg?itok=RjK4H3ci',
            alt: 'A demonstrator in a Boris Johnson costume holds a spade next to a mock headstone that says RIP British democracy.'
        },
        date: '28 August 2019',
        text: 'Demonstrations erupt across the country after the Prime Minister asks Queen to suspend Parliament untill October, giving MPs less time to block a no-deal Brexit.'
    },

    {
        media: {
            type: 'image',
            src: 'https://pbs.twimg.com/media/EDkpTl_XoAEzSFj.jpg',
            alt: 'Front page of The Times newspaper with headline: PM loses historic vote.'
        },
        date: '4 September 2019',
        text: 'MPs back a bill blocking a no-deal Brexit, forcing the Prime Minister to ask for an extension if a deal is not agreed with the EU by 31 October.'
    }
]

export default timelineData