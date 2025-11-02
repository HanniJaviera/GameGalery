import Image from "next/image";

export default function MiFooter() {
  return (
    <footer className="w-full bg-black text-gray-400 p-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        <div className="flex flex-col items-center md:items-start space-y-4">
          <div className="flex space-x-2">
            <Image src="/visa.png" alt="Visa" width={50} height={31} />
            <Image
              src="/mastercard.png"
              alt="Mastercard"
              width={50}
              height={31}
            />
            <Image src="/paypal.png" alt="PayPal" width={50} height={31} />
          </div>
          <p className="text-sm">
            &copy; {new Date().getFullYear()} GAME GALLERY. Todos los derechos
            reservados.
          </p>
        </div>

        <div className="flex flex-col items-center">
          <p className="text-white font-semibold mb-2">Contáctanos</p>
          <p className="text-sm">@gamegallery</p>
          <div className="flex space-x-3 my-2">
            <Image
              src="/iconowsp.webp"
              alt="WhatsApp"
              width={24}
              height={24}
              className="hover:opacity-75"
            />
            <Image
              src="/iconoig.png"
              alt="Instagram"
              width={24}
              height={24}
              className="hover:opacity-75"
            />
            <Image
              src="/iconox.webp"
              alt="X (Twitter)"
              width={24}
              height={24}
              className="hover:opacity-75"
            />
          </div>
          <p className="text-sm">+56911118888</p>
        </div>

        <div className="flex flex-col items-center md:items-end space-y-3">
          <p className="text-white font-semibold">Suscríbete a Novedades</p>
          <form className="flex flex-col space-y-2 w-full max-w-xs">
            <input
              type="email"
              placeholder="Tu correo electrónico"
              className="p-2 border border-gray-700 rounded text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded transition duration-200"
            >
              Suscribir
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
}
