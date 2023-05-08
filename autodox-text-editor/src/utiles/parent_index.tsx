export function parentIndex(targetId: string, data: any[], parent = -1): number {
    for (let i = 0; i < data.length; i++) {
        const item = data[i];
        if (item.id === targetId) {
            return parent;
        }
        if (item.children) {
            const childParentIndex = parentIndex(targetId, item.children, i);
            if (childParentIndex !== -1) {
                return childParentIndex;
            }
        }
    }
    return -1;
}