export abstract class InMemoryRepository<T extends { id: number }> {
  protected items: T[] = []
  protected nextId = 1

  async findAll(): Promise<T[]> {
    return [...this.items]
  }

  async findById(id: number): Promise<T | null> {
    return this.items.find((item) => item.id === id) ?? null
  }

  async create(data: Omit<T, 'id'>): Promise<T> {
    const entity = { ...data, id: this.nextId++ } as T
    this.items.push(entity)
    return entity
  }

  async update(id: number, data: Partial<Omit<T, 'id'>>): Promise<T | null> {
    const index = this.items.findIndex((item) => item.id === id)
    if (index === -1) {
      return null
    }
    this.items[index] = { ...this.items[index], ...data }
    return this.items[index]
  }

  async delete(id: number): Promise<void> {
    this.items = this.items.filter((item) => item.id !== id)
  }
}
