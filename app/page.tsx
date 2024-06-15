import Image from "next/image";

const Page = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <section className="dark:bg-abu bg-blue-800 text-white p-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">Kuliah Hebat</h1>
          <div>
            <a href="#about" className="ml-6">
              Tentang
            </a>
            <a href="#courses" className="ml-6">
              Kursus
            </a>
            <a href="#contact" className="ml-6">
              Kontak
            </a>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="dark:bg-black bg-blue-800 text-white text-center py-20">
        <h2 className="text-5xl font-bold mb-4">
          Selamat Datang di Kuliah Hebat
        </h2>
        <p className="text-lg mb-8">Masa depan cerah dimulai dari sini.</p>
        <a
          href="/mahasiswa"
          className="bg-yellow-500 text-blue-800 px-6 py-3 rounded-full font-bold"
        >
          Jelajahi E-learning
        </a>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 dark:bg-abu bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Tentang Kami</h2>
          <p className="text-lg mb-8">
            Kami menyediakan pendidikan berkualitas tinggi untuk mempersiapkan
            masa depan yang gemilang.
          </p>
          <div className="flex justify-center">
            <Image
              src="/image/rung.jpeg"
              width={800}
              height={400}
              alt="About Us"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="dark:bg-black bg-blue-800 text-white py-6">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Kuliah Hebat. Semua Hak Dilindungi.</p>
        </div>
      </footer>
    </div>
  );
};

export default Page;
