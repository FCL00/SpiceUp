import styles from "./Meals.module.css";
import MealItem from "./MealItem";
const MealsGrid = ({meals}) => {
  return (
    <ul className={styles.meals}>
        {meals.map((meal)=>{
            return (
              <li key={meal.id}>
                <MealItem {...meal}/>
              </li>
            );
        })}
    </ul>
  )
}

export default MealsGrid