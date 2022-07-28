import { Api } from "../axios-config";

interface IAuth {
  accessToken: string;
}

const auth = async (
  email: string,
  password: string
): Promise<IAuth | Error> => {
  try {
    const { data } = await Api.get();

    if (data) {
      return data.id;
    }

    return new Error("Erro ao cadastrar o registro.");
  } catch (error) {
    console.error(error);

    return new Error(
      (error as { message: string }).message || "Erro ao cadastrar o registro."
    );
  }
};

export const authService = {};
