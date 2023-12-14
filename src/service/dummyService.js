import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../utils/http';


const getAll = async () => {
    const res = await axiosInstance.get('/dummy')
    return res.data;
}
const deleteItem = async (id) => {
    const res = await axiosInstance.delete(`/dummy/${id}`);
    return res.data;
  };
  
const addItem = async (newItem) => {
    const res = await axiosInstance.post('/dummy', newItem);
    return res.data;
  };
  
const updateItem = async ({id, updatedItem}) => {
    const res = await axiosInstance.patch(`/dummy/${id}`, updatedItem);
    return res.data;
  };

export const UseDelete = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation(deleteItem, {
        onSuccess: () => {
            queryClient.invalidateQueries('all');
      },
    });
  
    const deleteItemById = (id) => {
      mutation.mutate(id);
    };
  
    return { deleteItemById, isLoading: mutation.isLoading };
  };

export const UseAdd = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation(addItem, {
      onSuccess: () => {
        queryClient.invalidateQueries('all');
      },
    });
  
    const addNewItem = (newItem) => {
      mutation.mutate(newItem);
    };
  
    return { addNewItem, isLoading: mutation.isLoading };
};

export const UseUpdate = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation(updateItem, {
        onSuccess: () => {
            queryClient.invalidateQueries('all')
        },
    });
    
    const updateItemById = (id, updatedItem) => {
        mutation.mutate({id, updatedItem});
    }
    return { updateItemById, isLoading: mutation.isLoading };

}
export const UseGetAll = () => {
    const {data, isLoading} = useQuery(['all'], getAll);
    return {data, isLoading}
}