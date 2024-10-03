import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import ElementItem from '../types/element.type';
import { createComponent } from '@lit/react';
import React from 'react';

@customElement('elements-list')
export class ElementsListWC extends LitElement {
  static styles = css`
    ul {
      list-style-type: none;
      padding: 0;
    }
    li {
      margin: 5px 0;
    }
    label {
      cursor: pointer;
    }
  `;

  @property({ type: Array }) elements: ElementItem[] = [];
  @property({ type: Function }) onToggleItem: (id: number) => void = () => {};
  @property({ type: Array }) selectedItems: ElementItem[] = [];

  render() {
    return html`
      <ul>
        ${this.elements.map(
          (element) => html`
            <li>
              <label>
                <input
                  type="checkbox"
                  .checked=${element.isChecked}
                  @change=${() => this.toggleItem(element.id)}
                />
                ${element.name}
              </label>
            </li>
          `
        )}
      </ul>
    `;
  }

  private toggleItem(item: number) {
    const isSelected = this.selectedItems.includes(item);
    const updatedSelection = isSelected
      ? this.selectedItems.filter((i) => i !== item)
      : [...this.selectedItems, item];
    this.selectedItems = updatedSelection;
    this.dispatchEvent(
      new CustomEvent('changeSelection', { detail: updatedSelection })
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'elements-list': ElementsListWC;
  }
}

// Создаем React обертку для Lit компонента
export const ElementsList = createComponent({
  react: React,
  tagName: 'elements-list',
  elementClass: ElementsListWC,
});
