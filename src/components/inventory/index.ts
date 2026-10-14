import { CardKey, StoredInventory, ToastType } from '../../types';
import { getCardByKey } from '../../utils';
import Card from '../card';
import Game from '../game';
import Toaster from '../toaster';

export default class Inventory {
    static initiate(currentInventory?: StoredInventory): void {
      const inventoryElement = document.getElementById('inventory')
      if (!(inventoryElement instanceof HTMLElement)) return

      const leftHandSlot = document.createElement('div')
      leftHandSlot.setAttribute('id', 'left-hand-slot')
      leftHandSlot.classList.add('left-hand-slot-empty')
      inventoryElement.appendChild(leftHandSlot)

      const armorSlot = document.createElement('div')
      armorSlot.setAttribute('id', 'armor-slot')
      armorSlot.classList.add('armor-slot-empty')
      inventoryElement.appendChild(armorSlot)

      const rightHandSlot = document.createElement('div')
      rightHandSlot.setAttribute('id', 'right-hand-slot')
      rightHandSlot.classList.add('right-hand-slot-empty')
      inventoryElement.appendChild(rightHandSlot)

      if (currentInventory?.armor) {
        this.equipArmor(currentInventory.armor)
      }
      if (currentInventory?.leftHand) {
        this.equipHand(currentInventory.leftHand)
      }
      if (currentInventory?.rightHand) {
        this.equipHand(currentInventory.rightHand)
      }
    }

    static equipArmor(cardKey: CardKey): void {
      const armorSlot = document.getElementById('armor-slot')
      if (!(armorSlot instanceof HTMLElement)) return
      if (armorSlot.classList.contains('slot-equipped')) {
        Toaster.display("asd", ToastType.Error)
        return
      }
      armorSlot.classList.remove('armor-slot-empty')
      armorSlot.classList.add('slot-equipped')
      const armorCard = getCardByKey(cardKey)
      if (!armorCard) return
      Card.create(armorCard, 'armor-slot', { isInteractive: false, updateDiscoveries: false })
      Game.saveInventory('armor', cardKey)
    }

    static equipHand(cardKey: CardKey): void {
      const leftHandSlot = document.getElementById('left-hand-slot')
      const rightHandSlot = document.getElementById('right-hand-slot')
      if (!(leftHandSlot instanceof HTMLElement) || !(rightHandSlot instanceof HTMLElement)) return

      const bothSlots = [leftHandSlot, rightHandSlot]
      const emptyHandSlot = bothSlots.find(slot => !slot.classList.contains('slot-equipped'))
      if (!emptyHandSlot) {
        Toaster.display("You have no free hands", ToastType.Error)
        return
      }
      const equippedItemElement = document.querySelector(`[non-interactive-id="card-${cardKey}"]`)
      if (equippedItemElement && bothSlots.some(slot => slot.contains(equippedItemElement))) {
        Toaster.display("Already equipped", ToastType.Error)
        return
      }
      emptyHandSlot.classList.remove('left-hand-slot-empty')
      emptyHandSlot.classList.remove('right-hand-slot-empty')
      emptyHandSlot.classList.add('slot-equipped')
      const handCard = getCardByKey(cardKey)
      if (!handCard) return
      Card.create(handCard, emptyHandSlot.id, { isInteractive: false, updateDiscoveries: false })
      Game.saveInventory(emptyHandSlot.id === 'left-hand-slot' ? 'leftHand' : 'rightHand', cardKey)
    }
}