import { IsEmail, IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class CreateCardDto {
  @IsString()
  @IsNotEmpty()
  public cardNumber: string;

  @IsString()
  @IsNotEmpty()
  public cardHolderName: string;

  @IsString()
  @IsNotEmpty()
  public expirationDate: string;

  @IsString()
  @IsNotEmpty()
  public cvv: string;

  @IsString()
  @IsNotEmpty()
  public nickname: string;

}

export class UpdateCardDto {
  @IsString()
  @IsNotEmpty()
  public cardNumber: string;

  @IsString()
  @IsNotEmpty()
  public cardHolderName: string;

  @IsString()
  @IsNotEmpty()
  public expirationDate: string;

  @IsString()
  @IsNotEmpty()
  public cvv: string;

  @IsString()
  @IsNotEmpty()
  public nickname: string;
}
