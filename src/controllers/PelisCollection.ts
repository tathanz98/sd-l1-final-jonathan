import { PelisCollection } from "../models"; // Ajustá el path según tu estructura
import { Peli } from "../models"; // O donde tengas definido el tipo Peli

type SearchOptions = {
  title?: string;
  tag?: string;
};

export class PelisController {
  private model: PelisCollection;

  constructor() {
    this.model = new PelisCollection();
  }

  // ✅ Devuelve pelis según el criterio: id o búsqueda
  async get(options?: { id?: number; search?: SearchOptions }): Promise<any> {
    if (options) {
      if (options.id) {
        return await this.model.getById(options.id);
      }
      if (options.search) {
        return await this.model.search(options.search);
      }
    }
    return await this.model.getAll();
  }

  
  async add(peli: Peli): Promise<boolean> {
    return await this.model.add(peli);
  }
}
