import Link from "next/link";
import styles from "./page.module.css";
import { Suspense } from "react";
import MealsGrid from "@/components/Meals/MealsGrid";
import { getMeals } from "@/lib/meals";

async function Meals(){
    const meals = await getMeals();

    return <MealsGrid meals={meals}/>;
}


export default function MealPage(){

    
    return (
        <>
            <header className={styles.header}>
                <h1>Delicious meals, created {''}</h1>
                <span className={styles.highlight}>by you</span>
                <p>Choose your own recipe and cook it yourself. It is easy and fun!</p>
                <p className={styles.cta}>
                    <Link href="/meals/share">
                        Share your favorite recipe
                    </Link> 
                </p>
            </header>
            <main className={styles.main}>
                <Suspense fallback={<p className={styles.loading}>Fetching meals</p>}>
                    <Meals />
                </Suspense>
            </main>
        </>
    );
}