// database model

import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import fs from "node:fs";

const db = sql("meals.db");

export async function getMeals(){
    await new Promise((resolve) => setTimeout(resolve, 2000));
    // throw new Error("There is no data");
    return db.prepare('SELECT * FROM meals').all();
}

export function getMeal(slug){
    
    return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
}

export async function saveMeal(meal){

    // cross site forgery protection removing all scripts tags in the inputs
    meal.slug = slugify(meal.title, {lower: true});
    meal.instructions = xss(meal.instructions);

    // save images to public folder
    const extension = meal.image.name.split('.').pop();

    // create a file name
    const fileName = `${meal.slug}.${extension}`
    
    const stream = fs.createWriteStream(`public/images/${fileName}`);
    const bufferedImage = await meal.image.arrayBuffer();

    stream.write(Buffer.from(bufferedImage), (error) => {
        if(error){
            throw new Error("saving image failed!");
        }
    });

    meal.image = `/images/${fileName}`;

    db.prepare(`
        INSERT INTO meals (title, summary, instructions, creator, creator_email, image, slug) 
        VALUES(@title, @summary, @instructions, @creator, @creator_email, @image, @slug)
    `).run(meal);
}