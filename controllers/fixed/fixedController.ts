import { Request, Response } from 'express';

import FixedExtension from './../../models/fixedExtension';

import { IParams, IRequestBody } from './../../utils/interfaces/index.d';

export const isChecked = async (req: Request, res: Response) => {
  try {
    const { extId }: IParams = req.params;
    const { isChecked }: IRequestBody = req.body;

    const extension = await FixedExtension.findOne({ where: { id: extId } });

    // 고정 확장자 리스트 확인
    if (!extension)
      return res
        .status(404)
        .json({ message: 'Extension Not Found', success: false });

    // 요청 타입 검증
    if (typeof isChecked !== 'boolean')
      return res.status(400).json({
        message: 'Invalid Request: isChecked must be a boolean',
        success: false,
      });

    // 요청 검증
    if (extension.is_checked === isChecked)
      return res.status(400).json({
        message:
          'Invalid Request: isChecked is already set to the requested value',
        success: false,
      });

    // is_checked 상태 변경
    extension.is_checked = isChecked;
    await extension.save();

    res.status(200).json({ message: 'Extension Check Succeed', success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Extension Check Failed',
      success: false,
    });
  }
};
