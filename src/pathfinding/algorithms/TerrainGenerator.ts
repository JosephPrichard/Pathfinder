/*
 * Copyright (c) Joseph Prichard 2022.
 */

import {createTileData, Point, Tile, TileData} from '../core/Components';
import {Grid} from '../core/Grid';
import {PointSet} from '../structures/Hash';

abstract class TerrainGenerator
{
    protected readonly width: number;
    protected readonly height: number;
    protected readonly ignore: PointSet;
    protected readonly data: TileData;

    protected constructor(width: number, height: number, data?: TileData, ignore?: Point[]) {
        this.width = width;
        this.height = height;
        this.ignore = new PointSet(width, height);
        if(data !== undefined) {
            this.data = data;
        } else {
            this.data = createTileData(true);
        }
        if(ignore !== undefined) {
            for(const i of ignore) {
                this.ignore.add(i);
            }
        }
    }

    /**
     * Draws a tile to the grid
     * @param grid
     * @param tile
     */
    protected draw(grid: Grid, tile: Tile) {
        if(!this.shouldIgnore(tile.point)) {
            grid.mutateTile(tile);
        }
    }

    protected getTerrain() {
        return this.data;
    }

    protected getSolid() {
        return {
            pathCost: 1,
            isSolid: true
        }
    }

    protected shouldIgnore(point: Point) {
        return this.ignore.has(point);
    }

    abstract generateTerrain(topLeft?: Point, bottomRight?: Point): Grid;
}

export default TerrainGenerator;