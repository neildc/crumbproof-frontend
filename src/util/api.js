import { LS_TOKEN_KEY } from "../constants/local_storage_keys";

export const defaultHeadersWithAuth = {
    Authorization: `Token ${localStorage.getItem(LS_TOKEN_KEY)}`
};
