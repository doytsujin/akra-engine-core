module akra {
	export interface ITriTreeNode {
	    baseNeighbor: ITriTreeNode;
	    leftNeighbor: ITriTreeNode;
	    rightNeighbor: ITriTreeNode;
	    leftChild: ITriTreeNode;
	    rightChild: ITriTreeNode;
	}
	
	export interface ITriangleNodePool {
	    request(): ITriTreeNode;
	    reset(): void;
	}	
}