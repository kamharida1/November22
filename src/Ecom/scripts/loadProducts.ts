import _ from 'lodash';
import moment from 'moment';
import { DataStore } from '@aws-amplify/datastore';
import { Product } from '../../models';
import products from '../data/products';


const adjectives = [
    'Hot',
    'Cold',
    'Large',
    'Small',
    'Glazed',
    'Sparkling',
    'Fluffy',
    'Iced',
    'Dirty',
    'Dry',
    'Energy',
    'Nitro',
    'Green',
    'Black',
    'Caramel',
    'Vegan',
    'Organic',
    'Non-Dairy',
    'Gluten Free',
];

const names = [
    'Donut',
    'Coffee',
    'Tea',
    'Muffin',
    'Latte',
    'Capuccino',
    'Espresso',
    'Cortado',
    'Macchiato',
    'Americano',
    'Affogato',
    'Milkshake',
    'Cider',
    'Juice',
    'Sandwich',
    'Panini',
    'Soda',
    'Chocolate',
    'Mocha',
    'Banana Bread',
    'Smoothie',
    'Frappe',
    'Pancakes',
    'Bagel',
    'Breakfast',
    'Ginger Tea',
    'Milk',
    'Freeze',
    'Cookie',
    'Granola Bar',
    'Cupcake',
    'Coffe Beans',
    'Cake',
];

const images = [
    "https://aws-appsync-refarch-offline-assets.s3-us-west-2.amazonaws.com/Cookie%402x.png",
    "https://aws-appsync-refarch-offline-assets.s3-us-west-2.amazonaws.com/Capuccino%402x.png",
    "https://aws-appsync-refarch-offline-assets.s3-us-west-2.amazonaws.com/ChocolateShake%402x.png",
    "https://aws-appsync-refarch-offline-assets.s3-us-west-2.amazonaws.com/Cupcake%402x.png",
    "https://aws-appsync-refarch-offline-assets.s3-us-west-2.amazonaws.com/Donut%402x.png",
    "https://aws-appsync-refarch-offline-assets.s3-us-west-2.amazonaws.com/DripCoffee%402x.png",
    "https://aws-appsync-refarch-offline-assets.s3-us-west-2.amazonaws.com/FoamedMilk%402x.png",
    "https://aws-appsync-refarch-offline-assets.s3-us-west-2.amazonaws.com/FrenchPress%402x.png",
    "https://aws-appsync-refarch-offline-assets.s3-us-west-2.amazonaws.com/Beans%402x.png",
    "https://aws-appsync-refarch-offline-assets.s3-us-west-2.amazonaws.com/Tea%402x.png",
];

function makestring(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

/**
 * Generates and saves 5 random products
 */
const load = async () => {
    // const promises = [];
    // for(let i=0; i<products.length; i++) {
    //     promises.push(
    //         DataStore.save(
    //             new Product({
    //                 title: _.sample(adjectives).concat(' ').concat(_.sample(names)),
    //                 price: parseFloat(_.random(2.5, 9.9).toFixed(2)),
    //                 image: _.sample(images),
    //                 avgRating: parseFloat(_.random(2.5, 9.9).toFixed(1)),
    //                 ratings: parseFloat(_.random(2.5, 9.9).toFixed(2)),
    //                 images: ["https://aws-appsync-refarch-offline-assets.s3-us-west-2.amazonaws.com/Cookie%402x.png",
    //                           "https://aws-appsync-refarch-offline-assets.s3-us-west-2.amazonaws.com/Capuccino%402x.png",
    //                           "https://aws-appsync-refarch-offline-assets.s3-us-west-2.amazonaws.com/ChocolateShake%402x.png",
    //                           "https://aws-appsync-refarch-offline-assets.s3-us-west-2.amazonaws.com/Cupcake%402x.png",
    //                           "https://aws-appsync-refarch-offline-assets.s3-us-west-2.amazonaws.com/Donut%402x.png",
    //                           "https://aws-appsync-refarch-offline-assets.s3-us-west-2.amazonaws.com/DripCoffee%402x.png",
    //                           "https://aws-appsync-refarch-offline-assets.s3-us-west-2.amazonaws.com/FoamedMilk%402x.png",
    //                           "https://aws-appsync-refarch-offline-assets.s3-us-west-2.amazonaws.com/FrenchPress%402x.png",
    //                           "https://aws-appsync-refarch-offline-assets.s3-us-west-2.amazonaws.com/Beans%402x.png",
    //                   "https://aws-appsync-refarch-offline-assets.s3-us-west-2.amazonaws.com/Tea%402x.png",
    //                 ],
    //                 description: makestring(30),
    //                 oldPrice: parseFloat(_.random(2.5, 9.9).toFixed(2)),
    //                 options: [makestring(5), makestring(10), makestring(20), makestring(6)]
    //             }
    //         ))
    //     );
    // }
    const promises = products.map((product) => (
      DataStore.save(
        new Product({
          title: product.title,
          price: product.price,
          image: product.image,
          avgRating: product.avgRating,
          ratings: product.ratings,
          images: product.images,
          description: product.description,
          oldPrice: product.oldPrice,
          options: product.options
        })
      )
    ))
    await Promise.all(promises);
};

export default load;

// id: ID!
//   title: String!
//   description: String
//   image: String!
//   images: [String!]!
//   options: [String!]

//   avgRating: Float
//   ratings: Int

//   price: Float!
//   oldPrice: Float