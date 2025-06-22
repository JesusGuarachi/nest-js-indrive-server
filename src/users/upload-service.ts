import { Injectable } from '@nestjs/common';
import { writeFile } from 'fs/promises';
import { join } from 'path';

@Injectable()
export class UploadService {
  async saveFile(file: Express.Multer.File) {
    // file.buffer contiene el contenido del archivo en memoria

    const filename = `${Date.now()}-${file.originalname}`;
    const path = join(__dirname, '../../uploads', filename);

    // Guardar manualmente en disco usando fs
    await writeFile(path, file.buffer);

    return {
      message: 'Archivo guardado exitosamente',
      filename,
      path,
      size: file.size,
      mimetype: file.mimetype,
    };
  }
}