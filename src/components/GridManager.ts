// Grid cell management system for the game map
export interface GridCell {
  id: string;
  position: [number, number, number]; // x, y, z coordinates
  type: 'path' | 'hive' | 'colony' | 'lab' | 'depot' | 'storage' | 'environment';
  occupied: boolean;
  level: number;
  buildingId?: string;
  objectIds: string[];
}

export interface GridPosition {
  x: number;
  z: number;
}

export class GridManager {
  private cells: Map<string, GridCell> = new Map();
  private gridSize = 4; // 4 unit spacing between cells

  constructor() {
    this.initializeGrid();
  }

  private initializeGrid() {
    // Create predefined cells for different sections
    const cellConfigs = [
      // Path cells (for movement)
      { type: 'path' as const, positions: [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]] },
      
      // Hive cells (for individual hives)
      { type: 'hive' as const, positions: [[-2, -2], [0, -2], [2, -2], [4, -2]] },
      
      // Colony cells (for bee colonies)
      { type: 'colony' as const, positions: [[-4, -4], [-2, -4], [0, -4], [2, -4]] },
      
      // Lab cells (for research facilities)
      { type: 'lab' as const, positions: [[-4, 2], [-2, 2]] },
      
      // Depot cells (for shipping/vehicles)
      { type: 'depot' as const, positions: [[2, 2], [4, 2]] },
      
      // Storage cells (for resources)
      { type: 'storage' as const, positions: [[-4, 4], [-2, 4], [0, 4]] },
      
      // Environment cells (for decoration/effects)
      { type: 'environment' as const, positions: [[2, 4], [4, 4], [-4, -2], [4, -4]] }
    ];

    cellConfigs.forEach(config => {
      config.positions.forEach(([x, z], index) => {
        const cellId = `${config.type}_${index}`;
        const worldPos: [number, number, number] = [
          x * this.gridSize,
          0,
          z * this.gridSize
        ];

        this.cells.set(cellId, {
          id: cellId,
          position: worldPos,
          type: config.type,
          occupied: false,
          level: 1,
          objectIds: []
        });
      });
    });
  }

  getCellAt(gridX: number, gridZ: number): GridCell | null {
    const worldX = gridX * this.gridSize;
    const worldZ = gridZ * this.gridSize;
    
    for (const cell of this.cells.values()) {
      if (Math.abs(cell.position[0] - worldX) < 0.1 && 
          Math.abs(cell.position[2] - worldZ) < 0.1) {
        return cell;
      }
    }
    return null;
  }

  getCellById(id: string): GridCell | null {
    return this.cells.get(id) || null;
  }

  getCellsByType(type: GridCell['type']): GridCell[] {
    return Array.from(this.cells.values()).filter(cell => cell.type === type);
  }

  occupyCell(cellId: string, buildingId: string): boolean {
    const cell = this.cells.get(cellId);
    if (cell && !cell.occupied) {
      cell.occupied = true;
      cell.buildingId = buildingId;
      return true;
    }
    return false;
  }

  vacateCell(cellId: string): boolean {
    const cell = this.cells.get(cellId);
    if (cell && cell.occupied) {
      cell.occupied = false;
      cell.buildingId = undefined;
      return true;
    }
    return false;
  }

  addObjectToCell(cellId: string, objectId: string): boolean {
    const cell = this.cells.get(cellId);
    if (cell) {
      cell.objectIds.push(objectId);
      return true;
    }
    return false;
  }

  removeObjectFromCell(cellId: string, objectId: string): boolean {
    const cell = this.cells.get(cellId);
    if (cell) {
      const index = cell.objectIds.indexOf(objectId);
      if (index > -1) {
        cell.objectIds.splice(index, 1);
        return true;
      }
    }
    return false;
  }

  upgradeCell(cellId: string): boolean {
    const cell = this.cells.get(cellId);
    if (cell && cell.level < 10) { // Max level 10
      cell.level++;
      return true;
    }
    return false;
  }

  getAllCells(): GridCell[] {
    return Array.from(this.cells.values());
  }

  worldToGrid(worldX: number, worldZ: number): GridPosition {
    return {
      x: Math.round(worldX / this.gridSize),
      z: Math.round(worldZ / this.gridSize)
    };
  }

  gridToWorld(gridX: number, gridZ: number): [number, number, number] {
    return [gridX * this.gridSize, 0, gridZ * this.gridSize];
  }
}
