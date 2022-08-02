class Minesweeper {
	constructor(options = {}) {
		this.rows = options.rows || 10;
		this.columns = options.columns || 10;
		this.mines = options.mines || parseInt(this.rows * this.columns * 0.15, 10); // 15 by default
	}

	generateMineArray() {
		this.mineArray = Array(this.rows * this.columns).fill(0);

		while (this.mines > 0) {
			// handle random bomb placement
			const i = Math.floor(Math.random() * this.mineArray.length);
			if (this.mineArray[i] === 9) continue;
			this.mineArray[i] = 9;
			this.mines--;
		}

		this.mineArray = this.fisherYatesShuffle(this.mineArray);
		this.mineArray = this.singleToMultiDimensionalArray(this.mineArray, this.columns);

		return this.mineArray;
	}

	fisherYatesShuffle() {
		let m = this.mineArray.length;

		while (m) {
			const i = Math.floor(Math.random() * m--);
			const t = this.mineArray[m];
			this.mineArray[m] = this.mineArray[i];
			this.mineArray[i] = t;
		}

		return this.mineArray;
	}

	singleToMultiDimensionalArray() {
		const rows = this.mineArray.length / this.columns;
		const t = [];
		for (let i = 0; i < rows; i++) {
			t.push(this.mineArray.splice(0, this.columns));
		}

		return t;
	}

	getBombs() {
		// find all the bombs on the board
		this.bombs = [];
		for (let i = 0; i < this.rows; i++) {
			// row
			for (let j = 0; j < this.columns; j++) {
				// column
				if (this.mineArray[i][j] === 9) {
					this.bombs.push([i, j]);
				}
			}
		}

		for (const [r, c] of this.bombs) {
			if (this.mineArray[r - 1] && this.mineArray[r - 1][c] !== 9) this.mineArray[r - 1][c]++; // one above
			if (this.mineArray[r + 1] && this.mineArray[r + 1][c] !== 9) this.mineArray[r + 1][c]++; // one below
			if (typeof this.mineArray[r][c + 1] !== "undefined" && this.mineArray[r][c + 1] !== 9) this.mineArray[r][c + 1]++; // one right
			if (typeof this.mineArray[r][c - 1] !== "undefined" && this.mineArray[r][c - 1] !== 9) this.mineArray[r][c - 1]++; // one left
			if (
				typeof this.mineArray[r - 1] !== "undefined" &&
				typeof this.mineArray[r - 1][c - 1] !== "undefined" &&
				this.mineArray[r - 1][c - 1] !== 9
			)
				this.mineArray[r - 1][c - 1]++;
			if (
				typeof this.mineArray[r - 1] !== "undefined" &&
				typeof this.mineArray[r - 1][c + 1] !== "undefined" &&
				this.mineArray[r - 1][c + 1] !== 9
			)
				this.mineArray[r - 1][c + 1]++;
			if (
				typeof this.mineArray[r + 1] !== "undefined" &&
				typeof this.mineArray[r + 1][c + 1] !== "undefined" &&
				this.mineArray[r + 1][c + 1] !== 9
			)
				this.mineArray[r + 1][c + 1]++;
			if (
				typeof this.mineArray[r + 1] !== "undefined" &&
				typeof this.mineArray[r + 1][c - 1] !== "undefined" &&
				this.mineArray[r + 1][c - 1] !== 9
			)
				this.mineArray[r + 1][c - 1]++;
		}

		return this.mineArray;
	}

	toEmojis() {
		for (let i = 0; i < this.rows; i++) {
			// row
			for (let j = 0; j < this.columns; j++) {
				// column
				let val = "";
				switch (this.mineArray[i][j]) {
					case 0:
						val = "|| :zero: ||";
						break;
					case 1:
						val = "|| :one: ||";
						break;
					case 2:
						val = "|| :two: ||";
						break;
					case 3:
						val = "|| :three: ||";
						break;
					case 4:
						val = "|| :four: ||";
						break;
					case 5:
						val = "|| :five: ||";
						break;
					case 6:
						val = "|| :six: ||";
						break;
					case 7:
						val = "|| :seven: ||";
						break;
					case 8:
						val = "|| :eight: ||";
						break;
					default:
						val = "|| :bomb: ||";
						break;
				}
				this.mineArray[i][j] = val;
			}
		}

		while (true) {
			// change one hidden zero to starter hint
			const i = Math.floor(Math.random() * this.rows);
			const j = Math.floor(Math.random() * this.columns);
			if (this.mineArray[i][j] === 9) continue;
			if (this.mineArray[i][j] !== "|| :zero: ||") continue;

			this.mineArray[i][j] = " :zero: ";
			break;
		}

		return this.mineArray;
	}

	toEmbedDescription() {
		let desc = "";
		for (let i = 0; i < this.rows; i++) {
			// row
			desc += this.mineArray[i].join(" ").trim() + "\n";
		}
		return desc;
	}

	start() {
		this.generateMineArray();
		this.getBombs();
		this.toEmojis();
		return this.toEmbedDescription();
	}
}

module.exports = { Minesweeper };
