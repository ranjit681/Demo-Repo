const puzzle =const puzzle = document.getElementById("puzzle");
        const tiles = [];

        // Create tiles and add them to the grid
        for (let i = 1; i <= 8; i++) {
            const tile = document.createElement("div");
            tile.className = "tile";
            tile.textContent = i;
            tiles.push(tile);
            puzzle.appendChild(tile);
        }

        // Add an empty tile
        const emptyTile = document.createElement("div");
        emptyTile.className = "tile empty";
        tiles.push(emptyTile);
        puzzle.appendChild(emptyTile);

        // Shuffle the tiles
        function shuffleTiles() {
            for (let i = tiles.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
            }

            // Update the grid with the shuffled tiles
            tiles.forEach(tile => puzzle.appendChild(tile));
        }

        shuffleTiles();

        // Add event listeners for tile movement
        tiles.forEach(tile => {
            tile.addEventListener("click", () => {
                const tileIndex = tiles.indexOf(tile);
                const emptyIndex = tiles.indexOf(emptyTile);

                if (isAdjacent(tileIndex, emptyIndex)) {
                    [tiles[tileIndex], tiles[emptyIndex]] = [tiles[emptyIndex], tiles[tileIndex]];
                    puzzle.innerHTML = "";
                    tiles.forEach(tile => puzzle.appendChild(tile));
                }
            });
        });

        function isAdjacent(index1, index2) {
            // Check if two tiles are adjacent
            const gridSize = 3;
            const row1 = Math.floor(index1 / gridSize);
            const col1 = index1 % gridSize;
            const row2 = Math.floor(index2 / gridSize);
            const col2 = index2 % gridSize;

            return Math.abs(row1 - row2) + Math.abs(col1 - col2) === 1;
        }
