export type Permission = {
	id: number;
	name: string;
	description: string;
};

export type Permissions = {
	data: Array<Permission>;
};
