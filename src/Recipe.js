import React from "react";
import style from "./recipe.module.css";
/*  ilk olark react dosyamizi import edelimguzel bir pratiktir. */
function Recipe({ title, calories, image, ing }) {
  return (
    <div className={style.wrapper}>
      <h1>{title}</h1>
      <ol>
        {ing.map((ingr) => (
          <li>
            {ingr.text} <img className={style.icon} src={ingr.image} alt="" />
          </li>
        ))}
      </ol>
      <h4>{calories}</h4>
      <img className={style.image} src={image} alt="" />
    </div>
  );
}

export default Recipe;
