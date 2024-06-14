import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <div className="dark:bg-abu bg-blue-800 text-white p-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">Kuliah Hebat</h1>
          <nav>
            <a href="#about" className="ml-6">
              Tentang
            </a>
            <a href="#courses" className="ml-6">
              Kursus
            </a>
            <a href="#contact" className="ml-6">
              Kontak
            </a>
          </nav>
        </div>
      </div>

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

      {/* Courses Section */}
      {/* <section id="courses" className="bg-gray-200 py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Kursus Kami</h2>
          <p className="text-lg mb-8">
            Pilih kursus yang sesuai dengan minat dan bakat Anda.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <Image
                src="/course1.jpg"
                width={400}
                height={200}
                alt="Course 1"
                className="rounded-t-lg"
              />
              <h3 className="text-2xl font-bold mt-4">Kursus 1</h3>
              <p className="text-lg">Deskripsi singkat tentang kursus 1.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <Image
                src="/course2.jpg"
                width={400}
                height={200}
                alt="Course 2"
                className="rounded-t-lg"
              />
              <h3 className="text-2xl font-bold mt-4">Kursus 2</h3>
              <p className="text-lg">Deskripsi singkat tentang kursus 2.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <Image
                src="/course3.jpg"
                width={400}
                height={200}
                alt="Course 3"
                className="rounded-t-lg"
              />
              <h3 className="text-2xl font-bold mt-4">Kursus 3</h3>
              <p className="text-lg">Deskripsi singkat tentang kursus 3.</p>
            </div>
          </div>
        </div>
      </section> */}

      {/* Contact Section */}
      {/* <section id="contact" className="py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Kontak Kami</h2>
          <p className="text-lg mb-8">
            Kami siap membantu Anda mencapai masa depan yang lebih baik.
          </p>
          <form className="max-w-md mx-auto">
            <input
              type="text"
              className="w-full p-4 mb-4 rounded-lg border"
              placeholder="Nama Anda"
            />
            <input
              type="email"
              className="w-full p-4 mb-4 rounded-lg border"
              placeholder="Email Anda"
            />
            <textarea
              className="w-full p-4 mb-4 rounded-lg border"
              rows={4}
              placeholder="Pesan Anda"
            ></textarea>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-full font-bold"
            >
              Kirim Pesan
            </button>
          </form>
        </div>
      </section> */}

      {/* Footer */}
      <footer className="dark:bg-black bg-blue-800 text-white py-6">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Kuliah Hebat. Semua Hak Dilindungi.</p>
        </div>
      </footer>
    </div>
  );
}
