import { ListLegal, SubtitleLegal, TextLegal, TitleLegal } from "@/shared/ui/Legal"

const TermsRu = () => {
  return (
    <>
      <TitleLegal>Условия использования</TitleLegal>
      <TextLegal>Последнее обновление: 14 декабря 2025 г.</TextLegal>
      <TextLegal>Пожалуйста, внимательно ознакомьтесь с этими Условиями перед использованием нашего сервиса.</TextLegal>
      <SubtitleLegal>Принятие условий</SubtitleLegal>
      <TextLegal>Используя BoostClock, вы соглашаетесь соблюдать настоящие Условия. Если вы не согласны, пожалуйста, не используйте сервис.</TextLegal>
      <SubtitleLegal>Изменение условий</SubtitleLegal>
      <TextLegal>Мы можем изменять эти Условия в любое время. Обновлённая версия вступает в силу немедленно после публикации на этой странице.</TextLegal>
      <SubtitleLegal>Использование BoostClock</SubtitleLegal>
      <ListLegal type="unordered">
        <li>Сервис распространяется под лицензией Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0).</li>
        <li>Вы можете свободно использовать, изменять и распространять сервис в некоммерческих целях при условии указания авторства.</li>
        <li>Использование BoostClock или его исходного кода в коммерческих целях запрещено без предварительного письменного разрешения.</li>
        <li>Запрещается использовать сервис для незаконной или вредоносной деятельности.</li>
      </ListLegal>
      <SubtitleLegal>Сбор и хранение данных</SubtitleLegal>
      <TextLegal>Для пользователей без авторизации мы храним настройки, задачи, достижения и статистику в локальном хранилище браузера (localStorage).</TextLegal>
      <TextLegal>Если вы создаёте аккаунт (через email/пароль или Google), ваши данные (задачи, статистика, достижения, настройки) сохраняются в Firebase Firestore и привязываются к вашему аккаунту.</TextLegal>
      <TextLegal>Firebase применяет отраслевые стандарты безопасности. Однако ни один способ электронного хранения не является абсолютно надёжным.</TextLegal>
      <TextLegal>Если данные удалены с вашего устройства или из Firebase, восстановить их невозможно.</TextLegal>
      <SubtitleLegal>Ограничение ответственности</SubtitleLegal>
      <TextLegal>Сервис предоставляется "как есть" и "как доступно", без каких-либо гарантий.</TextLegal>
      <ListLegal type="unordered">
        <li>Потеря данных из-за очистки localStorage, сбоев системы или проблем с Firebase.</li>
        <li>Любые убытки, вызванные использованием или невозможностью использования сервиса.</li>
        <li>Ошибки или перебои в работе сервиса.</li>
      </ListLegal>
      <SubtitleLegal>Управление вашими данными</SubtitleLegal>
      <TextLegal>Вы можете запросить удаление вашего аккаунта и всех связанных с ним данных в любое время, связавшись с нами по адресу, указанному ниже.</TextLegal>
      <SubtitleLegal>Контакты</SubtitleLegal>
      <TextLegal>Если у вас есть вопросы, напишите нам на <a href="mailto:flionx@mail.ru" className="underline">flionx@mail.ru</a>.</TextLegal>
    </>
  )
}

export default TermsRu