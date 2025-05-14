import { useContext, createContext } from 'react';

export const CategoryContext = createContext();

const useCategory = () => {
    return useContext(CategoryContext);
};

export default useCategory;
