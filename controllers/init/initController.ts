import fs from 'fs';

import FixedExtension from '../../models/fixedExtension';

export const initExtension = async (): Promise<void> => {
  try {
    const extensionJson = JSON.parse(
      fs.readFileSync(
        `${__dirname}/../../config/initialExtension.json`,
        'utf-8',
      ),
    );
    extensionJson.data.forEach(
      async ({ ext_name }: { ext_name: string }, index: number) => {
        try {
          const existExtension: FixedExtension | null =
            await FixedExtension.findByPk(index + 1);
          if (!existExtension) {
            await FixedExtension.create({
              ext_name,
            });
          }
        } catch (err) {
          console.log(err);
        }
      },
    );
  } catch (error) {
    console.error(error);
  }
};
