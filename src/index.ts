import minimist from "minimist";
import { PelisController } from "../src/controllers/PelisCollection";

async function main() {
  const args = minimist(process.argv.slice(2));
  const controller = new PelisController();

  const comando = args._[0];

  if (comando === "add") {
    const nuevaPeli = {
      id: Number(args.id),
      title: args.title,
      tags: Array.isArray(args.tags) ? args.tags : [args.tags],
    };
    const resultado = await controller.add(nuevaPeli);
    console.log(resultado);

  } else if (comando === "get") {
    const id = Number(args._[1]);
    const resultado = await controller.get({ id });
    console.log(resultado);

  } else if (comando === "search") {
    const searchOptions: any = {};
    if (args.title) searchOptions.title = args.title;
    if (args.tag) searchOptions.tag = args.tag;

    const resultado = await controller.get({ search: searchOptions });
    console.log(resultado);

  } else {
    // Sin comando: devuelve todas las pelis
    const resultado = await controller.get();
    console.log(resultado);
  }
}

main();

