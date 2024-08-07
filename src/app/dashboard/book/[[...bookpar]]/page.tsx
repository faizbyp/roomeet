import BookForm from "@/components/book";
import { axiosAuth } from "@/lib/axios";

const BookPage = async ({ params }: { params: { bookpar: string[] } }) => {
  console.log(params);
  let editData = undefined;

  if (params.bookpar) {
    try {
      const get = await axiosAuth.get(`/book/${params.bookpar[1]}`);
      editData = get.data;
      console.log("editData", get.data);
    } catch (error) {
      console.error(error);
    }
  }

  return <BookForm editData={editData} />;
};

export default BookPage;
