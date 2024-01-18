export type Permission = {
	id: number;
	name: string;
	description: string;
};

export type PermissionsResponse = {
	data: Array<Permission>;
};
