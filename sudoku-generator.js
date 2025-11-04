/**
 * Générateur de grille de Sudoku
 * Génère une grille 9x9 résolue et valide
 */

class SudokuGenerator {
  constructor() {
    this.grid = Array(9).fill(null).map(() => Array(9).fill(0));
  }

  /**
   * Vérifie si un nombre est valide à une position donnée
   * @param {number} row - Ligne (0-8)
   * @param {number} col - Colonne (0-8)
   * @param {number} num - Nombre à vérifier (1-9)
   * @returns {boolean}
   */
  isValid(row, col, num) {
    // Vérifier la ligne
    for (let x = 0; x < 9; x++) {
      if (this.grid[row][x] === num) {
        return false;
      }
    }

    // Vérifier la colonne
    for (let x = 0; x < 9; x++) {
      if (this.grid[x][col] === num) {
        return false;
      }
    }

    // Vérifier le bloc 3x3
    const startRow = row - (row % 3);
    const startCol = col - (col % 3);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.grid[i + startRow][j + startCol] === num) {
          return false;
        }
      }
    }

    return true;
  }

  /**
   * Mélange un tableau (Fisher-Yates shuffle)
   * @param {Array} array
   * @returns {Array}
   */
  shuffle(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  /**
   * Remplit la grille de manière récursive avec backtracking
   * @returns {boolean}
   */
  fillGrid() {
    // Trouver la prochaine case vide
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (this.grid[row][col] === 0) {
          // Essayer les chiffres de 1 à 9 dans un ordre aléatoire
          const numbers = this.shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);

          for (const num of numbers) {
            if (this.isValid(row, col, num)) {
              this.grid[row][col] = num;

              // Continuer à remplir récursivement
              if (this.fillGrid()) {
                return true;
              }

              // Backtrack si ça ne fonctionne pas
              this.grid[row][col] = 0;
            }
          }

          // Aucun nombre valide trouvé, backtrack
          return false;
        }
      }
    }

    // Toutes les cases sont remplies
    return true;
  }

  /**
   * Génère une grille de Sudoku résolue
   * @returns {number[][]}
   */
  generate() {
    this.grid = Array(9).fill(null).map(() => Array(9).fill(0));
    this.fillGrid();
    return this.grid;
  }

  /**
   * Affiche la grille dans la console
   */
  printGrid() {
    console.log('\n┌───────┬───────┬───────┐');
    for (let i = 0; i < 9; i++) {
      let row = '│ ';
      for (let j = 0; j < 9; j++) {
        row += this.grid[i][j] + ' ';
        if ((j + 1) % 3 === 0) {
          row += '│ ';
        }
      }
      console.log(row);

      if ((i + 1) % 3 === 0 && i < 8) {
        console.log('├───────┼───────┼───────┤');
      }
    }
    console.log('└───────┴───────┴───────┘\n');
  }

  /**
   * Retourne la grille sous forme de chaîne
   * @returns {string}
   */
  toString() {
    let result = '';
    for (let i = 0; i < 9; i++) {
      result += this.grid[i].join(' ') + '\n';
    }
    return result;
  }

  /**
   * Retourne la grille actuelle
   * @returns {number[][]}
   */
  getGrid() {
    return this.grid.map(row => [...row]);
  }
}

// Exemple d'utilisation
if (require.main === module) {
  console.log('=== Générateur de Grille de Sudoku ===\n');

  const generator = new SudokuGenerator();
  console.log('Génération d\'une grille de Sudoku résolue...\n');

  const grid = generator.generate();
  generator.printGrid();

  console.log('Grille générée avec succès !');
  console.log('\nFormat simple:');
  console.log(generator.toString());
}

module.exports = SudokuGenerator;
