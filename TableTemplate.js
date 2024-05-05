"use strict";
(function () {
  class TableTemplate {
    static fillIn(tId, dict, NameCol) {
      const table = document.getElementById(tId);

      const headerRow = table.rows[0];
      const isPartNumberTable = NameCol === "Part Number" && tId === "table1";

      Array.from(headerRow.cells).map((cell) => {
        const columnHeader = cell.textContent.trim();
        cell.textContent = this.fillCellTemplate(
          columnHeader,
          dict,
          columnHeader,
          isPartNumberTable,
        );
      });
      const columnIndex = NameCol
        ? Array.from(headerRow.cells).findIndex(
            (cell) => cell.textContent.trim() === NameCol,
          )
        : -1;

      for (let i = 1; i < table.rows.length; i++) {
        const row = table.rows[i];

        if (columnIndex !== -1) {
          const cell = row.cells[columnIndex];
          cell.textContent = this.fillCellTemplate(
            cell.textContent,
            dict,
            NameCol,
            false,
          );
        } else {
          Array.from(row.cells).forEach((cell, j) => {
            const currentNameCol = headerRow.cells[j].textContent.trim();
            cell.textContent = this.fillCellTemplate(
              cell.textContent,
              dict,
              currentNameCol,
              isPartNumberTable,
            );
          });
        }
      }

      table.style.visibility = "visible";
    }

    static fillCellTemplate(cellContent, dict, NameCol, isPartNumberTable) {
      const regex = /{{(.*?)}}/g;

      return cellContent.replace(regex, (match, property) => {
        const replacement =
          isPartNumberTable &&
          NameCol === "Part Number" &&
          property.startsWith("n")
            ? `{{${property}}}`
            : dict.hasOwnProperty(property)
              ? dict[property]
              : `{{${property}}}`;

        return replacement;
      });
    }
  }

  window.TableTemplate = TableTemplate;
})();
