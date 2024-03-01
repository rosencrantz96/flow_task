import { Request, Response } from 'express';
import { IRequestBody, IParams } from '../../utils/interfaces/index';

import CustomExtension from './../../models/customExtension';
import FixedExtension from '../../models/fixedExtension';

export const createExtension = async (req: Request, res: Response) => {
  try {
    let { extName }: IRequestBody = req.body;

    // 확장자에 내용이 없거나 빈칸인 경우 제한
    extName.trim();
    if (extName.length === 0)
      return res.status(400).json({
        message: 'Invalid Input: extName must not be empty or blank',
        success: false,
      });

    // 데이터 영문 소문자 제한
    const regex = /^[a-z]+$/;
    extName = extName.toLowerCase();

    if (!regex.test(extName))
      return res.status(400).json({
        message:
          'Invalid Input: extName must be lowercase alphabets without spaces',
        success: false,
      });

    // 글자수 제한
    if (extName.length > 20)
      return res.status(400).json({
        message: 'Character Limit: 20',
        success: false,
      });

    // 고정 확장자 검증
    const isFixed: FixedExtension | null = await FixedExtension.findOne({
      where: { ext_name: extName },
    });
    if (isFixed)
      return res.status(400).json({
        message: 'Invalid Request: is already exist in FixedExtension',
        success: false,
      });

    // 중복 확장자 검증
    const isCustom: CustomExtension | null = await CustomExtension.findOne({
      where: { ext_name: extName },
    });
    if (isCustom)
      return res.status(400).json({
        message: 'Invalid Request: is already exist in CustomExtension',
        success: false,
      });

    // 커스텀 확장자 200개 제한
    const customCount = await CustomExtension.count();
    if (customCount >= 200)
      return res.status(400).json({
        message: 'Custom Extension Limit: 200',
        success: false,
      });

    // 커스텀 확장자 추가
    await CustomExtension.create({
      ext_name: extName,
    });

    res.status(200).json({
      message: 'Successfully Added Custom Extension',
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Fail To Add Extension',
      success: false,
    });
  }
};

export const getExtension = async (req: Request, res: Response) => {
  try {
    const getExtension: CustomExtension[] = await CustomExtension.findAll({
      attributes: ['id', 'ext_name'],
      order: [['id', 'DESC']],
    });

    // 카멜 케이스로 변환
    const allExtension = getExtension.map((item) => {
      return {
        extId: item.id,
        extName: item.ext_name,
      };
    });

    res.status(200).json({
      allExtension,
      message: 'Successfully Get ALL Extensions',
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Fail To Get Extension',
      success: false,
    });
  }
};

export const deleteExtension = async (req: Request, res: Response) => {
  try {
    const { extId }: IParams = req.params;

    // 확장자 검증
    const isExist: CustomExtension = await CustomExtension.findOne({
      where: { id: extId },
    });
    if (!isExist)
      return res.status(404).json({
        message: 'Extension Not Found',
        success: false,
      });

    await isExist.destroy();
    res.status(200).json({
      message: 'Successfully Delete Extension',
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Fail To Delete Extension',
      success: false,
    });
  }
};
