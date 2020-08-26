import React, {useState} from 'react';
import s from './Paginator.module.css'
import {FilterType} from "../../redux/redusers/usersReducer";

type PropsType = {
    totalItemsCount: number
    pageSize: number
    portionSize: number
    onPageChanged: (pageNum: number) => void
    currentPage?: number
}

const Paginator: React.FC<PropsType> =({totalItemsCount, pageSize, portionSize, onPageChanged, currentPage})=> {
    let pagesCount = Math.ceil(totalItemsCount/pageSize);
    let onPageChangedClick =(pageNum: number)=>{
        onPageChanged(pageNum);
    }
    let pages=[];
    for(let i=1; i<=pagesCount; i++){
        pages.push(i);
    }

  let portionCount = Math.ceil(pagesCount/portionSize)
    let [portionNum, setPortionNum] = useState(1)
    let leftDigit = (portionNum-1) * portionSize
    let rightDigit = portionNum * portionSize

    return <div className={s.paginator}>
    {portionNum > 1 &&
    <button onClick={() => setPortionNum(portionNum-1)}>Previous</button> }
    { pages
        .filter(p=> p>= leftDigit && p<=rightDigit)
        .map(p=>{
            return  <span className={currentPage===p ? s.selectedPage : ""}
            key={p}
            onClick={(e)=>{onPageChangedClick(p)}}>{p}</span> })
        }
        {portionCount > portionNum &&
        <button onClick={() => setPortionNum(portionNum+1)}>Next</button> }


        </div>
}

export default Paginator;