
import LessonList from "../components/LessonList/LessonList";
import CreateLessonForm from "../components/CreateLessonForm/CreateLessonForm";
import React, { useEffect, useState } from 'react';
import Wallpaper from "../components/LessonDetails/components/Wallpaper";
import Carrousel from "../components/Carrousel/Carrousel"

export default function(props){

    const [lessons, setLessons] = useState([]);
    const [topRatedLessons, setTopRatedLessons] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseTopRatedLessons = await fetch(`https://localhost:7117/TopRatedLessons`);
        const dataTopRatedLessons = await responseTopRatedLessons.json();
        setTopRatedLessons(dataTopRatedLessons);

      } catch (error) {
        console.error('Error fetching data:', error);
      }

      try {
        const responseLessons = await fetch(`https://localhost:7117/api/Lesson/MyLessons/${props.userId}`);
        const responseTopRatedLessons = await fetch(`https://localhost:7117/TopRatedLessons`);
        const dataLessons = await responseLessons.json();
        const dataTopRatedLessons = await responseTopRatedLessons.json();
        setLessons(dataLessons.reverse());
        setTopRatedLessons(dataTopRatedLessons);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [props.userId]);



    return (
        <div>
            <Wallpaper />
            {Array.isArray(lessons) && lessons.length > 0 && (
            <LessonList lessons={lessons} header={"My Lessons"} />
            )}
            <Carrousel/>
            <LessonList lessons ={topRatedLessons} header ={"Top Rated Lessons"}/>      
        </div>
    )
}


