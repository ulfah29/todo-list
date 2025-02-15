import { useState } from 'react';
import './styles.css';

const mockData = [{
    id: 0,
    isComplete: false,
    description: 'create landing page 1',
},
{
    id: 1,
    isComplete: false,
    description: 'create landing page 2',
},
{
    id: 2,
    isComplete: false,
    description: 'create landing page 3',
}]

function List() {
    const [listData, setListData] = useState(mockData);
    const [inputTodoValue, setInputTodoValue] = useState('');
    const [selectedFilter, setSelectedFilter] = useState(1);
    const [selectedSort, setSelectedSort] = useState(1);
    const [finalList, setFinalList] = useState(listData);
    
    const onChangeCheckBox = (data) => {
        const updatedData = listData.map(item => {
            if (item.id === data.id) {
                return {
                    ...item,
                    isComplete: item.isComplete ? false : true,
                }
            }

            return item;
        });

        const updatedFilterData = finalList.map(item => {
            if (item.id === data.id) {
                return {
                    ...item,
                    isComplete: item.isComplete ? false : true,
                }
            }

            return item;
        });

        setListData(updatedData);
        setFinalList(updatedFilterData);
    }

    const handleDeleteList = (id) => {
        const deleteList = listData.filter(x => x.id !== id);
        const deleteFinalList = finalList.filter(x => x.id !== id);

        setListData(deleteList);
        setFinalList(deleteFinalList);
    }

    const listItem = () => {
        return finalList.map((data, idx) => {            
            return (
                <div className="listBox" key={idx}>
                    <label className={`radioContainer ${data.isComplete ? 'isComplete' : ''}`}>
                        {data.description}
                        <input type="checkbox" checked={data.isComplete} name="radio" onClick={() => onChangeCheckBox(data)} />
                        <span className="checkmark"></span>
                    </label>
                    <div className="deleteButton" onClick={() => handleDeleteList(data.id)}>delete</div>
                </div>
            )
        })
    }

    const handleOnChangeInput = (e) => {
        const inputValue = e.target.value;
        setInputTodoValue(inputValue);
    }

    const handleAddNewTodo = () => {
        if (!inputTodoValue) return;

        const newTodoItem = {
            id: listData.length + 1,
            isComplete: false,
            description: inputTodoValue,
        };

        const updateTodoList = [...listData, newTodoItem];
        const updateFinalList = [...finalList, newTodoItem]

        setListData(updateTodoList);
        setFinalList(updateFinalList);
        setInputTodoValue('');
    }

    const addNewTodo = () => {
        return (
            <div className="addNewContainer">
                <input type="text" placeholder="Add new to-do" value={inputTodoValue} onChange={e => handleOnChangeInput(e)} />
                <button onClick={() => handleAddNewTodo()}>Add</button>
            </div>
        )
    }

    const countDoneList = () => {
        const filterDoneList = listData.filter(item => item.isComplete);

        return filterDoneList.length;
    }

    const handleSelectFilter = (e) => {
        const selectedFilterValue = Number(e.target.value);
        let selectedFilterList = listData;

        if (selectedFilterValue === 2) {
            selectedFilterList = listData.filter(item => item.isComplete);
        } else if (selectedFilterValue === 3) {
            selectedFilterList = listData.filter(item => !item.isComplete);
        }

        setFinalList(selectedFilterList);
        setSelectedFilter(selectedFilterValue);
    }

    const handleSelectSort = (e) => {
        const selectedSortValue = Number(e.target.value);
        let selectedSort = listData;

        if (selectedSortValue === 2) {
            selectedSort = listData.sort(function(a, b){return a.id - b.id});
        } else if (selectedSortValue === 3) {
            selectedSort = listData.sort(function(a, b){return b.id - a.id});
        }

        setFinalList(selectedSort);
        setSelectedSort(selectedSortValue);
    }

    return (
        <div className="container">
            <h1>To-do list ({String(countDoneList())}/{String(listData.length)})</h1>

            <div className="filterGroup">
                <div className="filterMenu">
                    <label>Filter:</label>
                    <select value={selectedFilter} onChange={e => handleSelectFilter(e)}>
                        <option value={1}>All</option>
                        <option value={2}>Complete</option>
                        <option value={3}>Not Complete</option>
                    </select>
                </div>

                <div>
                    <label>Sort:</label>
                    <select value={selectedSort} onChange={e => handleSelectSort(e)}>
                        <option value={1}>Default</option>
                        <option value={2}>Older</option>
                        <option value={3}>Latest</option>
                    </select>
                </div>
            </div>

            
            {listItem()}
            {addNewTodo()}
        </div>
    )
}

export default List;
