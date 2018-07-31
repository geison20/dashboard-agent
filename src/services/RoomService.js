import axios from "../helpers/axios";

export const getRooms = async () =>
	axios.get("/api/rooms").then((response) => response);
